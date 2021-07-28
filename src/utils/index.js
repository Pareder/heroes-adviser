const BASE_HEALTH = 200;
const BASE_MANA = 75;
const HEALTH_MULTIPLIER = 20;
const MANA_MULTIPLIER = 12;
const HEALTH_REGEN_MULTIPLIER = 0.1;
const MANA_REGEN_MULTIPLIER = 0.05;
const ARMOR_MULTIPLIER = 0.167;

function rounding(value) {
  return Math.trunc(value * 10) / 10;
}

export function getHealth(hero) {
  return (hero.base_health || BASE_HEALTH) + ((hero.base_str || 0) * HEALTH_MULTIPLIER);
}

export function getMana(hero) {
  return (hero.base_mana || BASE_MANA) + ((hero.base_int || 0) * MANA_MULTIPLIER);
}

export function getHealthRegen(hero) {
  return rounding((hero.base_health_regen || 0) + ((hero.base_str || 0) * HEALTH_REGEN_MULTIPLIER));
}

export function getManaRegen(hero) {
  return rounding((hero.base_mana_regen || 0) + ((hero.base_int || 0) * MANA_REGEN_MULTIPLIER));
}

export function getMinAttackDamage(hero) {
  const attribute = hero.primary_attr;
  return hero.base_attack_min + hero[`base_${attribute}`];
}

export function getMaxAttackDamage(hero) {
  const attribute = hero.primary_attr;
  return hero.base_attack_max + hero[`base_${attribute}`];
}

export function getArmor(hero) {
  return (((hero.base_armor) || 0) + ((hero.base_agi || 0) * ARMOR_MULTIPLIER)).toFixed(1);
}
