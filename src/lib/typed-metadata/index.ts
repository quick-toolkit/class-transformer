/**
 * MIT License
 * Copyright (c) 2021 RanYunLong<549510622@qq.com> quick-toolkit/class-transformer
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { TypeMirror } from '../type-mirror';
import { ClassConstructor } from '@quick-toolkit/class-mirror';
import validator from 'validator';
import { IsEmailOptions } from 'validator/lib/isEmail';
import { IsMobilePhoneOptions } from 'validator/lib/isMobilePhone';
import MobilePhoneLocale = validator.MobilePhoneLocale;
import { IsFloatOptions } from 'validator/lib/isFloat';
import { IsIntOptions } from 'validator/lib/isInt';
import { IsCurrencyOptions } from 'validator/lib/isCurrency';
import IsDateOptions = validator.IsDateOptions;
import { IsDecimalOptions } from 'validator/lib/isDecimal';
import { IsFQDNOptions } from 'validator/lib/isFQDN';
import { IPVersion } from 'validator/lib/isIP';
import IdentityCardLocale = validator.IdentityCardLocale;
import { IsISSNOptions } from 'validator/lib/isISSN';
import { IsMACAddressOptions } from 'validator/lib/isMACAddress';
import { IsNumericOptions } from 'validator/lib/isNumeric';
import { IsURLOptions } from 'validator/lib/isURL';
import { UUIDVersion } from 'validator/lib/isUUID';

/**
 * @class TypedMetadata
 */
export class TypedMetadata<T = any> {
  /**
   * ????????????
   * @param rules
   */
  public static mergeRule(rules: Rule | Rule[] | string | string[]): Rule[] {
    if (Array.isArray(rules)) {
      return rules.map((o) => {
        if (typeof o === 'string') {
          return {
            type: o as any,
          };
        }
        return o;
      });
    } else if (typeof rules === 'object' && rules !== null) {
      return [rules];
    }
    return [
      {
        type: rules as any,
      },
    ];
  }

  /**
   * ??????ApiPropertyMetadata??????
   * @param type
   * @param options
   */
  public static create<T = any>(
    type: TypeMirror | ClassConstructor,
    options?: TypedMetadataOptions<T>
  ): TypedMetadata {
    return new TypedMetadata(
      type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type),
      options
    );
  }

  /**
   * ????????????
   * @param type ????????????
   * @param options ????????????
   */
  public constructor(
    public type?: TypeMirror,
    public options?: TypedMetadataOptions<T>
  ) {
    if (type) {
      type.metadata = this;
    }
  }
}

export interface RuleType {
  /**
   * ????????????
   */
  message?: string;
}

export interface EnumRule extends RuleType {
  /**
   * ??????
   */
  type: 'Enum';
  /**
   * ?????????
   */
  enums: Array<string | number | boolean | null | undefined | ClassConstructor>;
}

export interface LengthRule extends RuleType {
  /**
   * ??????
   */
  type: 'length';
  /**
   * ??????
   */
  len: number;
}

export interface EmailRule extends RuleType {
  /**
   * ??????
   */
  type: 'Email';
  /**
   * ??????
   */
  options?: IsEmailOptions;
}

export interface RangeRule extends RuleType {
  /**
   * ??????
   */
  type: 'range';
  /**
   * ?????????
   */
  min?: number;
  /**
   * ?????????
   */
  max?: number;
}

export interface MobilePhoneRule extends RuleType {
  /**
   * ??????
   */
  type: 'MobilePhone';
  /**
   * ??????
   */
  locale?: MobilePhoneLocale | MobilePhoneLocale[];
  /**
   * ????????????
   */
  options?: IsMobilePhoneOptions;
}

export interface FloatRule extends RuleType {
  type: 'Float';
  options?: IsFloatOptions;
}

export interface IntegerRule extends RuleType {
  type: 'Integer';
  options?: IsIntOptions;
}

export interface StringRule extends RuleType {
  type:
    | 'Base32'
    | 'Base58'
    | 'Base64'
    | 'BIC'
    | 'BtcAddress'
    | 'DataURI'
    | 'EthereumAddress'
    | 'FullWidth'
    | 'HexColor'
    | 'HSL'
    | 'Hexadecimal'
    | 'HalfWidth'
    | 'IBAN'
    | 'ISIN'
    | 'ISO4217'
    | 'ISRC'
    | 'JSON'
    | 'JWT'
    | 'LatLong'
    | 'Locale'
    | 'Lowercase'
    | 'MongoId'
    | 'MD5'
    | 'MagnetURI'
    | 'MimeType'
    | 'Port'
    | 'RFC3339'
    | 'SemVer'
    | 'Slug'
    | 'SurrogatePair'
    | 'Uppercase'
    | 'VariableWidth';
}

export interface CurrencyRule extends RuleType {
  type: 'Currency';
  options?: IsCurrencyOptions;
}

export interface DateRule extends RuleType {
  type: 'Date';
  options?: IsDateOptions;
}

export interface DecimalRule extends RuleType {
  type: 'Decimal';
  options: IsDecimalOptions;
}

export interface FQDNRule extends RuleType {
  type: 'FQDN';
  options?: IsFQDNOptions;
}

export interface IPRule extends RuleType {
  type: 'IP' | 'IPRange';
  version?: IPVersion;
}

export interface IdentityCardRule extends RuleType {
  type: 'IdentityCard';
  options?: IdentityCardLocale;
}

export interface ISSNRule extends RuleType {
  type: 'ISSN';
  options?: IsISSNOptions;
}

export interface MACAddressRule extends RuleType {
  type: 'MACAddress';
  options?: IsMACAddressOptions;
}

export interface NumericRule extends RuleType {
  type: 'Numeric';
  options?: IsNumericOptions;
}

export interface PassportNumberRule extends RuleType {
  type: 'PassportNumber';
  countryCode?: string;
}

export interface RgbColorRule extends RuleType {
  type: 'RgbColor';
  includePercentValues?: boolean;
}

export interface UrlRule extends RuleType {
  type: 'Url';
  options?: IsURLOptions;
}

export interface UUIDRule extends RuleType {
  type: 'UUID';
  version?: UUIDVersion;
}

export type Rule =
  | UUIDRule
  | UrlRule
  | RgbColorRule
  | NumericRule
  | PassportNumberRule
  | MACAddressRule
  | IdentityCardRule
  | ISSNRule
  | IPRule
  | FQDNRule
  | DecimalRule
  | DateRule
  | CurrencyRule
  | EnumRule
  | LengthRule
  | EmailRule
  | RangeRule
  | MobilePhoneRule
  | FloatRule
  | IntegerRule
  | StringRule;

export interface TypedMetadataOptions<T = any> {
  /**
   * ???????????? ??????????????????????????????????????????
   */
  alias?: string;
  /**
   * ????????????
   */
  rules?: Rule | Rule[] | string | string[];
  /**
   * ???????????? Map ??? Set ??? Promise ??? Array ?????????????????????
   */
  elementRules?: Rule | Rule[] | string | string[];
  /**
   * ??????????????????
   */
  required?: string | true;
  /**
   * ????????????
   */
  description?: string;
  /**
   * ????????????
   * @param values
   */
  transform?: (values: any) => T;
}
