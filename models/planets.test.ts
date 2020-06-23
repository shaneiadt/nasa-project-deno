import { assertEquals } from '../test_deps.ts';
import { filterHabitablePlanets } from './planets.ts';

const HABITABLE_PLANET = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1',
  koi_srad: '1',
  koi_smass: '1'
};

const NOT_CONFIRMED = {
  koi_disposition: 'FALSE POSITIVE'
};

const TO_LARGE_PLANETARY_RADIUS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1.5',
  koi_srad: '1',
  koi_smass: '1'
};

const TO_LARGE_SOLAR_RADIUS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1',
  koi_srad: '1.01',
  koi_smass: '1'
};

const TO_LARGE_SOLAR_MASS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1',
  koi_srad: '1',
  koi_smass: '1.04'
};

Deno.test('filter only habitable planets', () => {

  const result = filterHabitablePlanets([
    HABITABLE_PLANET,
    NOT_CONFIRMED,
    TO_LARGE_PLANETARY_RADIUS,
    TO_LARGE_SOLAR_MASS,
    TO_LARGE_SOLAR_RADIUS
  ]);

  assertEquals(result, [
    HABITABLE_PLANET
  ]);
});