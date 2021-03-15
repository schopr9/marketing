import _ from "lodash";
import { BuildOptions, DataTypes, Model, ModelAttributes } from "sequelize";

interface MarketingMemberContext extends Model {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  registeredAt: Date;
  intercomId: string;
  hubspotId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type MarketingProviderContextInstance = typeof Model & {
  new (
    values?: Record<string, unknown>,
    options?: BuildOptions
  ): MarketingProviderContextInstance;
} & MarketingMemberContext;

const attributes: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registeredAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

export function init(sequelize) {
  const MarketingProviderContext = sequelize.define(
    "MarketingProviderContext",
    attributes,
    {
      paranoid: true,
    }
  ) as MarketingProviderContextInstance & {
    associate;
    createProvider;
    getById;
  };

  // class method
  MarketingProviderContext.getById = async (
    id: string,
    paranoid: boolean = true
  ): Promise<MarketingMemberContext> => {
    try {
      return await MarketingProviderContext.findByPk(id, { paranoid });
    } catch (err) {
      throw new Error(err);
    }
  };

  //instance method
  MarketingProviderContext.prototype.name = function (): string {
    return this.firstName + this.lastName;
  };

  return MarketingProviderContext as MarketingProviderContextInstance & {
    getById;
  };
}
