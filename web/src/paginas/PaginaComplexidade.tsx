import { Fragment } from 'react';
import { ANALISES, type Caso } from '../../../src/core/index';
import { Cabecalho } from './comum';

function Notacoes({ c }: { c: Caso }) {
  return (
    <div className="notacoes">
      <span className="sim">O</span>
      <span>{c.O.slice(1)}</span>
      <span className="sim">Ω</span>
      <span>{c.Omega.slice(1)}</span>
      <span className="sim">Θ</span>
      <span className={c.Theta ? 'theta' : 'apagado'}>{c.Theta ? c.Theta.slice(1) : 'sem limite justo único'}</span>
      <span className="quando">{c.quando}</span>
    </div>
  );
}

export function PaginaComplexidade() {
  const modulos = [...new Set(ANALISES.map((a) => a.modulo))];

  return (
    <>
      <Cabecalho titulo="Complexidade computacional" tupla={<>O( ) limite superior, Ω( ) limite inferior, Θ( ) limite justo</>} />
      <div className="folha-larga" style={{ maxWidth: 1240 }}>
        <section className="bloco">
          <p className="dica" style={{ fontSize: 'var(--t-15)', maxWidth: '72ch' }}>
            Para cada algoritmo implementado, o melhor caso, o caso médio e o pior caso. Quando O e Ω coincidem, o limite é justo (Θ). As variáveis de cada linha estão descritas abaixo do nome do algoritmo.
          </p>
          <div className="tabela-rolagem">
            <table className="tabela tabela-cx">
              <thead>
                <tr>
                  <th>Algoritmo</th>
                  <th>Melhor caso</th>
                  <th>Caso médio</th>
                  <th>Pior caso</th>
                </tr>
              </thead>
              <tbody>
                {modulos.map((m) => (
                  <Fragment key={m}>
                    <tr className="modulo-linha">
                      <td colSpan={4}>Módulo {m.replace(' · ', ' — ')}</td>
                    </tr>
                    {ANALISES.filter((a) => a.modulo === m).map((a) => (
                      <tr key={a.id}>
                        <td className="alg">
                          <strong>{a.algoritmo}</strong>
                          <span>{a.descricao}</span>
                          <span className="mono">{a.variaveis}</span>
                        </td>
                        <td>
                          <Notacoes c={a.melhor} />
                        </td>
                        <td>
                          <Notacoes c={a.medio} />
                        </td>
                        <td>
                          <Notacoes c={a.pior} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </>
  );
}
