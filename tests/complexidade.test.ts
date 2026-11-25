import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ANALISES, AutomatoFinito, AutomatoPilha, EXEMPLOS_AF, EXEMPLOS_AP, EXEMPLOS_GLC, EXEMPLOS_MT, GramaticaLC, MaquinaTuring } from '../src/core/index.js';

describe('Análise de complexidade', () => {
  test('todo algoritmo tem melhor, médio e pior caso com O e Ω', () => {
    for (const a of ANALISES) for (const caso of [a.melhor, a.medio, a.pior]) {
      assert.match(caso.O, /^O\(/, a.id);
      assert.match(caso.Omega, /^Ω\(/, a.id);
      if (caso.Theta) assert.match(caso.Theta, /^Θ\(/, a.id);
    }
  });
});

describe('Arquivos de exemplo', () => {
  const grupos: [string, { id: string; json: unknown }[], (j: unknown) => unknown][] = [
    ['AF', EXEMPLOS_AF, (j) => AutomatoFinito.deJSON(j)],
    ['GLC', EXEMPLOS_GLC, (j) => GramaticaLC.deJSON(j)],
    ['AP', EXEMPLOS_AP, (j) => AutomatoPilha.deJSON(j)],
    ['MT', EXEMPLOS_MT, (j) => MaquinaTuring.deJSON(j)],
  ];
  for (const [nome, lista, carregar] of grupos) {
    test(`${nome}: exemplos carregam sem erro e /exemplos/*.json estão sincronizados`, () => {
      for (const e of lista) {
        carregar(e.json);
        const arquivo = JSON.parse(readFileSync(new URL(`../exemplos/${e.id}.json`, import.meta.url), 'utf8'));
        assert.deepEqual(arquivo, e.json, `exemplos/${e.id}.json diferente de src/core/exemplos.ts`);
        carregar(arquivo);
      }
    });
  }
});
