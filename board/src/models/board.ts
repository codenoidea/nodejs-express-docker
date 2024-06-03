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
  user_id: string;
  title: string;
  content: string;
  thumbs_up?: string;
  thumbs_down?: string;
  created_at?: Date;
  updated_at?: Date;
  owner_yn?: string;
}

export class board extends Model<boardAttributes> {
  id!: number;
  user_id!: string;
  title!: string;
  content!: string;
  thumbs_up!: string;
  thumbs_down!: string;
  created_at!: Date;
  updated_at!: Date;
  owner_yn!: string;
}

board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    thumbs_up: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    thumbs_down: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
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
    underscored: true, // 위 세 가지 타임스탬프의 컬럼명 표기법 설정, true로 하면 snake case / false면 camel case
  }
);
