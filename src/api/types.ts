import {IsArray, IsBoolean, IsNumber, IsNumberString, IsOptional, IsString} from 'class-validator';
import {IsTimezone} from '../util/validators/IsTimezone';
import {IsCustom} from '../util/validators/IsCustom';
import {Type} from 'koa-ts-controllers';


export class CreateUserParams {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumberString()
  hour: number;

  @IsNumberString()
  minute: number;

  @IsString()
  @IsTimezone()
  timezone: string;

  @IsOptional()
  @IsArray()
  subs?: string[];
}

export class UpdateUserParams {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

export class UpdateSubParams {
  @IsCustom({
    name: 'IsSubreddit',
    message: 'Must be a subreddit in the format: r/name',
    validator: (value: string) => value && value.startsWith('r/')
  })
  @IsString()
  name: string;
}

export class UpdateScheduleParams {

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  hour: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  minute: number;

  @IsOptional()
  @IsString()
  @IsTimezone()
  timezone?: string;

  @IsOptional()
  @IsBoolean()
  disabled? = false;

}

