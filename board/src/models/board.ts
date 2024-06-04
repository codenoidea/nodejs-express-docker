import { DataTypes, Model } from "sequelize";
import sequelize from "../db/sequelize";

export interface iInfoReq {
  id: number;
  userId?: string;
}

export interface iListReq {
  limit?: number;
  page?: number;
  userId?: string;
}

interface boardAttributes {
  id?: number;
  title: string;
  content: string;
  thumbsUp?: string;
  thumbsDown?: string;
  userId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  ownerYn?: string;
}

export class board extends Model {
  id!: number;
  title!: string;
  content!: string;
  thumbsUp!: string;
  thumbsDown!: string;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  ownerYn!: string;
}

board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    thumbsUp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    thumbsDown: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize, // 꼭 넣어줘야 함
    modelName: "board",
    tableName: "board",
    freezeTableName: true, // 테이블명 변경 불가
    timestamps: false, // create_at, updated_at 컬럼 생성
    underscored: false, // 위 세 가지 타임스탬프의 컬럼명 표기법 설정, true로 하면 snake case / false면 camel case
  }
);
