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

import { Utils } from '../../utils';
import { TransformPlugin } from '../../transform-plugin';
import { validate } from '../../validate';

/**
 * 字符串转换插件
 */
export class ToDatePlugin extends TransformPlugin {
  /**
   * 插件注册类型
   */
  public static type = Date;

  /**
   * 类型验证
   */
  public validator(fieldValue: string): void {
    const { field } = this.typeMirror;
    this.validateRequired(fieldValue);
    if (fieldValue !== undefined) {
      validate(field, fieldValue, [
        {
          type: 'Date',
          validator: (values: any): boolean =>
            values instanceof Date && !isNaN(values.getTime()),
        },
      ]);
    }
  }

  /**
   * 转换成实例
   * @param values
   */
  public transform(values: any): Date | undefined {
    values = this.beforeTransform(values);
    this.validator(values);
    return Utils.toDate(values);
  }
}
