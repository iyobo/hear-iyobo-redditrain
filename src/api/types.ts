import {IsArray, IsBoolean, IsOptional, IsString} from 'class-validator';
import {IsTimezone} from '../util/validators/IsTimezone';
import {IsCustom} from '../util/validators/IsCustom';


export class CreateUserParams {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  time = '8am';

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

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  @IsTimezone()
  timezone?: string;

  @IsOptional()
  @IsBoolean()
  disabled? = false;

}