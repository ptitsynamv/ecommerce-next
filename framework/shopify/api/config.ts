import { APIConfig } from '@common/types/api';
import { SHOPITY_CHECKOUT_ID_COOKIE } from '@framework/const';
import { fetchApi } from '@framework/utils';

class Config {
  private config: APIConfig;

  constructor(config: APIConfig) {
    this.config = config;
  }

  getConfig(): APIConfig {
    return this.config;
  }
}

const configWrapper = new Config({
  fetch: fetchApi,
  checkoutCookie: SHOPITY_CHECKOUT_ID_COOKIE,
});

export function getConfig() {
  return configWrapper.getConfig();
}
