export class UpdateRequestEvent {
  constructor(
    public userId: number,
    public status: boolean,
  ) {}
}
