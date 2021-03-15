import { MarketingProviderContextInstance } from "./marketingDataProvider";
import { init } from "./marketingDataProvider";

describe("Marketing provider context", () => {
  const userInstance = createMockUser();
  let mockFindByPk = jest.fn();
  let sequelize = {
    define: jest.fn(() => {
      return function User() {
        this.name = "john";
        return { findByPk: mockFindByPk };
      };
    }),
  };

  describe("getById", () => {
    it("Should return a user", async () => {
      let User = await init(sequelize);

      mockFindByPk.mockResolvedValue(userInstance);
      const user = await User.getById("userId");
      expect(user).toStrictEqual(userInstance);
    });

    it("Should return undefined", async () => {
      let User = await init(sequelize);

      mockFindByPk.mockResolvedValue(undefined);
      const user = await User.getById("cdscdscsdcs");
      expect(user).toStrictEqual(undefined);
    });
  });
});

function createMockUser(data = {}): Partial<MarketingProviderContextInstance> {
  const email = "some@rbc.com";
  const userObj = Object.assign(
    {
      id: "1",
      appCode: "YR10",
      firstName: "john",
      lastName: "doe",
      email: email,
      phoneNumber: "574487478448",
      preferredLanguage: "en",
      createdAt: new Date("2020-02-24"),
      updatedAt: new Date("2020-02-25"),
      registeredAt: new Date("2020-02-26"),
    },
    {
      ...data,
    }
  );

  return userObj;
}
