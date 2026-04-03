import { useState } from 'react'
import { Sun, Moon, Languages, Percent } from 'lucide-react'

const translations = {
  en: {
    title: 'Percentage Calculator',
    subtitle: 'Calculate percentages in three ways: X% of Y, X is what % of Y, % change from X to Y.',
    mode1: 'X% of Y',
    mode2: 'X is what % of Y',
    mode3: '% change X to Y',
    mode1Desc: 'Calculate the percentage of a number',
    mode2Desc: 'Find what percentage X is of Y',
    mode3Desc: 'Calculate percentage increase/decrease',
    percentage: 'Percentage (%)',
    of: 'of',
    number: 'Number',
    result: 'Result',
    from: 'From',
    to: 'To',
    change: 'Change',
    increase: 'increase',
    decrease: 'decrease',
    calculate: 'Calculate',
    builtBy: 'Built by',
  },
  pt: {
    title: 'Calculadora de Porcentagem',
    subtitle: 'Calcule porcentagens de tres formas: X% de Y, X e que % de Y, variacao % de X para Y.',
    mode1: 'X% de Y',
    mode2: 'X e quantos % de Y',
    mode3: 'Variacao % de X para Y',
    mode1Desc: 'Calcule a porcentagem de um numero',
    mode2Desc: 'Descubra que porcentagem X e de Y',
    mode3Desc: 'Calcule aumento/reducao percentual',
    percentage: 'Porcentagem (%)',
    of: 'de',
    number: 'Numero',
    result: 'Resultado',
    from: 'De',
    to: 'Para',
    change: 'Variacao',
    increase: 'aumento',
    decrease: 'reducao',
    calculate: 'Calcular',
    builtBy: 'Criado por',
  },
} as const

type Lang = keyof typeof translations
type Mode = 'xOfY' | 'whatPct' | 'change'

function formatResult(n: number): string {
  if (isNaN(n) || !isFinite(n)) return '—'
  return parseFloat(n.toPrecision(10)).toLocaleString('en-US', { maximumFractionDigits: 6 })
}

export default function PercentageCalculator() {
  const [lang, setLang] = useState<Lang>(() => navigator.language.startsWith('pt') ? 'pt' : 'en')
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [mode, setMode] = useState<Mode>('xOfY')

  // Mode 1: X% of Y
  const [pct1, setPct1] = useState('20')
  const [y1, setY1] = useState('150')

  // Mode 2: X is what % of Y
  const [x2, setX2] = useState('25')
  const [y2, setY2] = useState('200')

  // Mode 3: % change from X to Y
  const [x3, setX3] = useState('80')
  const [y3, setY3] = useState('100')

  const t = translations[lang]

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.classList.toggle('dark', !d)
      return !d
    })
  }

  const result1 = (parseFloat(pct1) / 100) * parseFloat(y1)
  const result2 = (parseFloat(x2) / parseFloat(y2)) * 100
  const result3 = ((parseFloat(y3) - parseFloat(x3)) / Math.abs(parseFloat(x3))) * 100

  const modes: { key: Mode; label: string; desc: string }[] = [
    { key: 'xOfY', label: t.mode1, desc: t.mode1Desc },
    { key: 'whatPct', label: t.mode2, desc: t.mode2Desc },
    { key: 'change', label: t.mode3, desc: t.mode3Desc },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <Percent size={18} className="text-white" />
            </div>
            <span className="font-semibold">Percentage Calculator</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(l => l === 'en' ? 'pt' : 'en')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>
            <button onClick={toggleDark} className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="https://github.com/gmowses/percentage-calculator" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">{t.subtitle}</p>
          </div>

          {/* Mode selector */}
          <div className="grid gap-3 sm:grid-cols-3">
            {modes.map(({ key, label, desc }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`text-left p-4 rounded-xl border transition-colors ${mode === key ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700' : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
              >
                <div className={`text-sm font-bold mb-1 ${mode === key ? 'text-amber-600 dark:text-amber-400' : ''}`}>{label}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</div>
              </button>
            ))}
          </div>

          {/* Calculator */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-6">
            {mode === 'xOfY' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={pct1}
                      onChange={e => setPct1(e.target.value)}
                      className="w-28 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-amber-500 font-bold">%</span>
                  </div>
                  <span className="text-zinc-400">{t.of}</span>
                  <input
                    type="number"
                    value={y1}
                    onChange={e => setY1(e.target.value)}
                    className="w-32 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-zinc-400">=</span>
                  <div className="rounded-xl bg-amber-500 text-white px-6 py-3 font-mono text-2xl font-bold">
                    {formatResult(result1)}
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Formula: ({pct1} / 100) × {y1} = {formatResult(result1)}</p>
              </div>
            )}

            {mode === 'whatPct' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-lg font-semibold">
                  <input
                    type="number"
                    value={x2}
                    onChange={e => setX2(e.target.value)}
                    className="w-32 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-zinc-400">{t.of}</span>
                  <input
                    type="number"
                    value={y2}
                    onChange={e => setY2(e.target.value)}
                    className="w-32 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-zinc-400">=</span>
                  <div className="rounded-xl bg-amber-500 text-white px-6 py-3 font-mono text-2xl font-bold">
                    {formatResult(result2)}%
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Formula: ({x2} / {y2}) × 100 = {formatResult(result2)}%</p>
              </div>
            )}

            {mode === 'change' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-lg font-semibold">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 font-normal">{t.from}</label>
                    <input
                      type="number"
                      value={x3}
                      onChange={e => setX3(e.target.value)}
                      className="w-32 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <span className="text-zinc-400 mt-4">→</span>
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 font-normal">{t.to}</label>
                    <input
                      type="number"
                      value={y3}
                      onChange={e => setY3(e.target.value)}
                      className="w-32 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-zinc-400">=</span>
                    <div className={`rounded-xl text-white px-6 py-3 font-mono text-2xl font-bold ${result3 >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                      {result3 >= 0 ? '+' : ''}{formatResult(result3)}%
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Formula: (({y3} - {x3}) / |{x3}|) × 100 = {formatResult(result3)}% ({result3 >= 0 ? t.increase : t.decrease})
                </p>
              </div>
            )}
          </div>

          {/* Quick reference */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="font-semibold mb-4">Quick Reference</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              {[10, 15, 20, 25, 30, 50, 75].map(p => (
                <div key={p} className="flex items-center justify-between rounded-lg bg-zinc-50 dark:bg-zinc-800/30 px-3 py-2">
                  <span className="text-zinc-500">{p}% of 1000</span>
                  <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">{p * 10}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <span>{t.builtBy} <a href="https://github.com/gmowses" className="text-zinc-600 dark:text-zinc-300 hover:text-amber-500 transition-colors">Gabriel Mowses</a></span>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  )
}
