import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from '../../models/report.model';
import { User } from '../../models/users.model';
import { CreateReportDto } from '../../dtos/create-report.dto';
import { UpdatePositionDto } from '../../dtos/update-position.dto';
import { CreateEventDto } from '../../dtos/create-event.dto';
import { UpdateEventDto } from '../../dtos/update-event.dto';
import { ImageUploadService } from '../image-upload/image-upload.service';

export const MAX_ID_RANGE = 999999999;
export function generateId(): number {
	return Math.floor(Math.random() * Math.floor(MAX_ID_RANGE));
}

@Injectable()
export class ReportService {

	constructor(
		@InjectModel('Report') private readonly reportModel: Model<Report>,
		private readonly imageUploadService: ImageUploadService
	) { }
	async getAllReportsByUser(providerUserId): Promise<Report[]> {
		try {
			const reports = await this.reportModel.find({ user_id: providerUserId });
			return reports;
		} catch (error) {
			throw new HttpException('could not reach the database', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	async getAllEventsByReportId(reportId: number, userId: string) {
		try {
			const report = await this.reportModel.findOne({ id: reportId, user_id: userId });
			return report.events;
		} catch (error) {
			throw new HttpException('could not reach the database', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	async createReport(providerId: string, createReportDto: CreateReportDto): Promise<Report> {
		const newReport = new this.reportModel({
			id: generateId(),
			user_id: providerId,
			current_status: 'open',
			events: [],
			chatroom: {
				id: 37,
				report_id: 37,
				messages: [],
				users: []
			},
			...createReportDto
		});

		try {
			await newReport.save();
			return newReport;
		} catch (error) {
			throw new HttpException('could not save new report in the database', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	async closeReport(user: User) {
		return await this.reportModel.updateOne({ user_id: user.provider_user_id, current_status: 'open' }, { $set: { 'current_status': 'closed' } });
	}

	async updatePosition(user: User, updatePositionDto: UpdatePositionDto) {
		return await this.reportModel.findOneAndUpdate({
			user_id: user.provider_user_id
		}, { latitude: updatePositionDto.latitude, longitude: updatePositionDto.longitude });
	}

	async createEvent(id: number, createEventDto: CreateEventDto) {
		const properties = await Promise.all(createEventDto.properties_attributes.map(async (prop) => {
			//! TODO: property_type must be removed
			if (prop.name === 'media') {
				prop.documents_attributes = await Promise.all(prop.documents_attributes.map(async (attr: { data: string }) => {
					try {
						attr.data = await this.imageUploadService.saveImage(attr.data);
						return attr;
					} catch (error) {
						throw error;
					}
				}));
				return {
					id: generateId(),
					...prop,
					value: prop.documents_attributes,
				}
			} else {
				return {
					id: generateId(),
					...prop
				}
			}
		}));

		const event = {
			id: generateId(),
			event_type: createEventDto.event_type,
			time: createEventDto.time,
			properties
		};
		const previouseReportEvents = await this.reportModel.findOne({ id });
		const events = [...previouseReportEvents.events];
		events.push(event);
		await this.reportModel.findOneAndUpdate({
			id
		}, { events });
		return event;
	}

	async deleteEventByUseId(provider_user_id: string, eventId: string) {
		try {

			let report = await this.reportModel.findOne({ user_id: provider_user_id, current_status: 'open' });
			const events = [...report.events].filter(event => parseInt(eventId) !== event.id);
			return await this.reportModel.findOneAndUpdate({ user_id: provider_user_id, current_status: 'open' }, { events });
		} catch (error) {
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateEventById(userId: string, eventId: string, updateEventDto: UpdateEventDto) {
		try {
			let report = await this.reportModel.findOne({ user_id: userId, current_status: 'open' });
			let events = [...report.events];
			let updatedEvent: any;
			events =
				await this.reportModel.update(
					{
						user_id: userId,
						current_status: 'open'
					},
					{
						events: await Promise.all(events.map(async event => {
							if (event.id === parseInt(eventId)) {
								event.properties = updateEventDto.properties_attributes;
								event.properties = await Promise.all([...event.properties].map(async prop => {
									if (prop.name === 'media') {
										prop.documents_attributes = await Promise.all(prop.documents_attributes.map(async (attr: { data: string }) => {
											try {
												attr.data = await this.imageUploadService.saveImage(attr.data);
												return attr;
											} catch (error) {
												throw error;
											}
										}));
										return {
											...prop,
											value: prop.documents_attributes
										};
									}
									return prop;
								}));
								updatedEvent = event;
							}
							return event;
						}))
					}
				);
			if (updatedEvent) {
				return updatedEvent;
			} else {
				throw new HttpException('could not find event', HttpStatus.BAD_REQUEST);
			}
		} catch (error) {
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async deleteAllReportsByUserId(userId: string) {
		try {
			await this.reportModel.remove({ user_id: userId });
		} catch (error) {
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
