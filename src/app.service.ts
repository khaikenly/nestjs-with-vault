import { VaultService } from '@app/infra';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly vaultService: VaultService) {}

  getHello() {
    return this.vaultService.getSecret('secret/data/nest-app');
  }
}
