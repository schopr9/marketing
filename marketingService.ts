import { Model } from "sequelize";
import actionhero from "./ActionHero";

interface ProfilePayloadHubspot {
  properties: ProfilePayloadHubspotItem[];
}
interface ProfilePayloadHubspotItem {
  property: string;
  value: string | number;
}
type ProfilePayloads = ProfilePayloadHubspot;

interface MarketingProviderDto {
  service: string;
  config?: HubspotConfig;
  isActive?: boolean;
}

interface HubspotConfig {
  clientId: string;
  clientSecret: string;
  tokenCode?: string;
  refreshToken?: string;
}

interface UserModel extends Model {
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

interface MarketingService {
  shouldAuthenticate?(dto: MarketingProviderDto): boolean;
  authenticate?(): Promise<any>;
}

interface MarketingProviderDto {
  service: string;
  config?: HubspotConfig;
  isActive?: boolean;
}

interface QueueParameters {
  userId: string;
  type: string;
  body: unknown | Record<string, unknown>;
  url: string;
  method: string;
  headers: {
    [key: string]: string;
  };
}

abstract class MarketingService {
  abstract sendProfileToQueue(user: UserModel): Promise<void>;
  abstract sendProfileToProvider(
    user: UserModel,
    body: ProfilePayloads
  ): Promise<void>;

  async sendToQueue(
    user: UserModel,
    body: ProfilePayloads,
    type: string,
    path: string
  ): Promise<void> {
    const { task } = actionhero;
    const parameters: QueueParameters = {
      userId: user.id,
      type,
      body,
      url: path,
      method: "post",
      headers: { "content-type": "application/json" },
    };

    try {
      await task.enqueue(parameters);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default MarketingService;
