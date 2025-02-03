export class TRPCReturnObject {
  type: "data" | "error" | "void";
  data: Record<string, unknown> | null;
  message: string | null;

  constructor(options: {
    type: "data" | "error" | "void";
    data?: Record<string, unknown> | null;
    message?: string | null;
  }) {
    this.type = options.type;
    this.data = options.data ?? null;
    this.message = options.message ?? null;
  }
}
