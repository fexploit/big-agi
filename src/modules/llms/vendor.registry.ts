import { DModelSource, DModelSourceId, ModelVendor, ModelVendorId } from './llm.types';
import { ModelVendorAnthropic } from './anthropic/anthropic.vendor';
import { ModelVendorLocalAI } from './localai/localai.vendor';
import { ModelVendorOoobabooga } from './oobabooga/oobabooga.vendor';
import { ModelVendorOpenAI } from './openai/openai.vendor';


/// Internal - Main Vendor Registry ///

const MODEL_VENDOR_REGISTRY: Record<ModelVendorId, ModelVendor> = {
  anthropic: ModelVendorAnthropic,
  localai: ModelVendorLocalAI,
  oobabooga: ModelVendorOoobabooga,
  openai: ModelVendorOpenAI,
  // azure_openai: { id: 'azure_openai', name: 'Azure OpenAI', instanceLimit: 1, location: 'cloud', rank: 30 },
  // google_vertex: { id: 'google_vertex', name: 'Google Vertex', instanceLimit: 1, location: 'cloud', rank: 40 },
  // anthropic: { id: 'anthropic', name: 'Anthropic', instanceLimit: 1, location: 'cloud', rank: 50 },
};

const DEFAULT_MODEL_VENDOR: ModelVendorId = 'openai';

export function findAllVendors(): ModelVendor[] {
  const modelVendors = Object.values(MODEL_VENDOR_REGISTRY);
  modelVendors.sort((a, b) => a.rank - b.rank);
  return modelVendors;
}

export function findVendorById(vendorId?: ModelVendorId): ModelVendor | null {
  return vendorId ? (MODEL_VENDOR_REGISTRY[vendorId] ?? null) : null;
}

export function createModelSourceForDefaultVendor(otherSources: DModelSource[]): DModelSource {
  return createModelSourceForVendor(DEFAULT_MODEL_VENDOR, otherSources);
}

export function createModelSourceForVendor(vendorId: ModelVendorId, otherSources: DModelSource[]): DModelSource {
  // get vendor
  const vendor = findVendorById(vendorId);
  if (!vendor) throw new Error(`createModelSource: Vendor not found for id ${vendorId}`);

  // find an id
  const { id: sourceId, count } = _uniqueSourceId(vendorId, otherSources);

  // create the source
  return {
    id: sourceId,
    label: vendor.name + (count > 0 ? ` #${count}` : ''),
    vId: vendorId,
    setup: {},
  };
}

function _uniqueSourceId(vendorId: ModelVendorId, otherSources: DModelSource[]): { id: string, count: number } {
  let id: DModelSourceId = vendorId;
  let count = 0;
  while (otherSources.find(source => source.id === id)) {
    count++;
    id = `${vendorId}-${count}`;
  }
  return { id, count };
}