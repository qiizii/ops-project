declare module 'mockjs' {
  interface MockjsRandom {
    guid(): string;
    natural(min?: number, max?: number): number;
    string(pool?: string, min?: number, max?: number): string;
    date(format?: string): string;
    image(size?: string, background?: string, foreground?: string, text?: string): string;
    paragraph(min?: number, max?: number): string;
    name(middle?: boolean): string;
    cname(): string;
    url(): string;
    email(): string;
    ip(): string;
    region(): string;
    province(): string;
    city(prefix?: boolean): string;
    county(prefix?: boolean): string;
    zip(upper?: boolean): string;
    [key: string]: any;
  }
  
  interface MockjsSetupOptions {
    timeout?: string | number;
  }
  
  interface Mockjs {
    Random: MockjsRandom;
    mock<T>(template: any): T;
    mock(rurl: string | RegExp, rtype: string, template: any): void;
    mock(rurl: string | RegExp, template: any): void;
    setup(options: MockjsSetupOptions): void;
    version: string;
    _mocked: Record<string, any>;
  }
  
  const mockjs: Mockjs;
  export = mockjs;
} 