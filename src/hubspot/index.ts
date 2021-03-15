// marketing service abstract class
// extended hubspot service
// marketing service default method
// insert event to events table currently its logging to events log - advantage
// register member -> broadcast event (task) -> task -> multiple tasks ->  trigger marketing service -> hubspot service or intercom service or firebase service  -> send updated profile to provider
// marketing service structure
//    - set of events as input (member register, earning, bank accounts added, unlinked card, deactivated)
//    - categorize and call service based on the event
//    - service boundary - talk to other services
//    - controller boundary - business logic
//    - data provider - database calls

import MarketingService from "../../marketingService";
import { UserModel, ProfilePayloadHubspot } from "../../marketingInterface";

export default class HubspotService extends MarketingService {
  protected readonly marketingProfilePath: string =
    "/v1/marketing/send/profile";

  public generateProfilePayload(user: UserModel): ProfilePayloadHubspot {
    return {
      properties: [
        {
          property: "vcmId",
          value: user.id,
        },
        {
          property: "firstName",
          value: user.firstName,
        },
        {
          property: "lastName",
          value: user.lastName,
        },
        {
          property: "phone",
          value: user.phoneNumber,
        },
        {
          property: "hs_language",
          value: user.preferredLanguage,
        },
        {
          property: "lastUpdated",
          value: user.updatedAt.toISOString(),
        },
        {
          property: "registrationMethod",
          value: "user",
        },
      ],
    };
  }
  public async sendProfileToQueue(user: UserModel): Promise<void> {
    const profilePayload: ProfilePayloadHubspot = this.generateProfilePayload(
      user
    );
    await this.sendToQueue(
      user,
      profilePayload,
      "PROFILE",
      this.marketingProfilePath
    );
  }
}
