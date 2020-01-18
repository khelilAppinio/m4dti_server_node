import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConnectedClientsHistory } from '../../models/connected-clients-history.model';
@Injectable()
export class ConnectedClientsHistoryService {

	constructor(@InjectModel('ConnectedClientsHistory') private readonly connectedClientsHistoryModel: Model<ConnectedClientsHistory>) { }
	public async update(username: string, isConnected: boolean, socketID: string): Promise<ConnectedClientsHistory> {// ! TODO: need a DTO here
		const foundUsername = await this.findById(username);
		if (foundUsername) {
			return await this.connectedClientsHistoryModel.updateOne({ username }, { isConnected, socketID }).exec();
		} else {
			const connectedClientsHistory = new this.connectedClientsHistoryModel({
				username,
				isConnected,
				socketID,
			});
			return await connectedClientsHistory.save();
		}
	}

	private async findById(username: string): Promise<ConnectedClientsHistory> { // ! TODO: need to be ID not Username
		return this.connectedClientsHistoryModel.findOne({ username }).exec();
	}
}
