import { AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, forwardRef, OnInit, QueryList, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';

@Component({
  selector: 'magma-date-range-input',
  standalone: false,
  templateUrl: './magma-date-range-input.component.html',
  styleUrl: './magma-date-range-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagmaDateRangeInputComponent),
      multi: true,
    },
  ],
})
export class MagmaDateRangeInputComponent implements ControlValueAccessor{

  displayValue: string = '';
  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(obj: { from: Date; to: Date } | null): void {
    if (obj?.from && obj?.to) {
      const fromStr = this.formatDate(obj.from);
      const toStr = this.formatDate(obj.to);
      this.displayValue = `${fromStr} - ${toStr}`;
    } else {
      this.displayValue = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.displayValue = value;

    const [fromStr, toStr] = value.split(' - ');
    const from = this.parseDate(fromStr);
    const to = this.parseDate(toStr);

    if (from && to) {
      this.onChange({ from, to });
    } else {
      this.onChange(null);
    }
  }

  private formatDate(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  private parseDate(dateStr: string): Date | null {
    const parts = dateStr?.trim().split('/');
    if (parts.length !== 3) return null;

    const [mm, dd, yyyy] = parts.map(p => parseInt(p, 10));
    if (!mm || !dd || !yyyy) return null;

    const date = new Date(yyyy, mm - 1, dd);
    return isNaN(date.getTime()) ? null : date;
  }

}
