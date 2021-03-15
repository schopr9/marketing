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

export function init(db): MarketingMemberContext {
  const MarketingProviderContext = db.sequelize.define(
    "MarketingProviderContext",
    attributes,
    {
      paranoid: true,
    }
  ) as MarketingProviderContextInstance & {
    associate;
    createProvider;
  };

  return MarketingProviderContext;
}
