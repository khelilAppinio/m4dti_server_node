import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConnectedClientsHistory } from '../../models/connected-clients-history.model';
@Injectable()
export class ConnectedClientsHistoryService {

	constructor(@InjectModel('ConnectedClientsHistory') private readonly connectedClientsHistoryModel: Model<ConnectedClientsHistory>) { }
	public async update(name: string, isConnected: boolean, socketID: string): Promise<ConnectedClientsHistory> {// ! TODO: need a DTO here
		const foundname = await this.findById(name);
		if (foundname) {
			return await this.connectedClientsHistoryModel.updateOne({ name }, { isConnected, socketID }).exec();
		} else {
			const connectedClientsHistory = new this.connectedClientsHistoryModel({
				name,
				isConnected,
				socketID,
			});
			return await connectedClientsHistory.save();
		}
	}

	private async findById(name: string): Promise<ConnectedClientsHistory> { // ! TODO: need to be ID not name
		return this.connectedClientsHistoryModel.findOne({ name }).exec();
	}

	public async 	findAllConnectedClientsHistory(isConnected?: boolean) {
		return (typeof isConnected === 'undefined') ? this.connectedClientsHistoryModel.find().exec()
			: this.connectedClientsHistoryModel.find({ isConnected }).exec();
	}
}
