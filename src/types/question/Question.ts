import type { ModuleRef } from './ModuleRef';
import type { PartRef } from './PartRef';

export interface Question {
  id: string;
  text: string;
  type?: string;
  validationStatus?: string;
  modules?: ModuleRef[];
  parts?: PartRef[];
}
