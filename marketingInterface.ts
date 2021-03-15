import { Model } from "sequelize";
export interface UserModel extends Model {
  id: string;
  appConfigId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  preferredLanguage: string;
  registeredAt: Date;
  intercomId: string;
  hubspotId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}


export interface ProfilePayloadHubspot {
  properties: ProfilePayloadHubspotItem[];
}
interface ProfilePayloadHubspotItem {
  property: string;
  value: string | number;
}
type ProfilePayloads = ProfilePayloadHubspot;
