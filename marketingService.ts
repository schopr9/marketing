import actionhero from "./ActionHero";
import { UserModel, ProfilePayloadHubspot } from "./marketingInterface";

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
