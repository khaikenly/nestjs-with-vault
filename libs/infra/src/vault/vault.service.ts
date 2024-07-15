import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as NodeVault from 'node-vault';

@Injectable()
export class VaultService {
  private readonly vaultClient: NodeVault.client;

  constructor(private readonly configService: ConfigService) {
    this.vaultClient = NodeVault({
      apiVersion: this.configService.get<string>('VAULT_API_VERSION'),
      endpoint: this.configService.get<string>('VAULT_ADDR'),
      token: this.configService.get<string>('VAULT_TOKEN'),
    });
  }

  /**
   * Get secret from vault
   *
   * @param {String} path - Path to the secret in vault
   * @returns data - Secret data
   */
  async getSecret(path: string): Promise<Record<string, string>> {
    try {
      const roleId = this.configService.get<string>('VAULT_ROLE_ID');
      const secretId = this.configService.get<string>('VAULT_SECRET_ID');

      const { auth } = await this.vaultClient.approleLogin({
        role_id: roleId,
        secret_id: secretId,
      });

      this.vaultClient.token = auth.client_token;

      const {
        data: { data },
      } = await this.vaultClient.read(path);

      return data;
    } catch (error) {
      throw new Error(`Error reading secret from vault ${path}: ${error}`);
    }
  }

  async writeSecret(path: string, data: Record<string, string>): Promise<void> {
    try {
      const roleId = this.configService.get<string>('VAULT_ROLE_ID');
      const secretId = this.configService.get<string>('VAULT_SECRET_ID');

      const { auth } = await this.vaultClient.approleLogin({
        role_id: roleId,
        secret_id: secretId,
      });

      this.vaultClient.token = auth.client_token;

      await this.vaultClient.write(path, data);
    } catch (error) {
      throw new Error(`Error writing secret to vault ${path}: ${error}`);
    }
  }
}
