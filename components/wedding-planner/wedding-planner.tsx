'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { PersonType, PlannerPreferences, PlannerResponse, RankedProduct, StoreName, WeddingEvent } from '@/lib/types';

type WeddingPlannerProps = {
  initialProducts: RankedProduct[];
  initialPreferences: Required<PlannerPreferences>;
};

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

const events: Array<{ value: WeddingEvent; label: string }> = [
  { value: 'haldi', label: 'Haldi' },
  { value: 'mehndi', label: 'Mehndi' },
  { value: 'sangeet', label: 'Sangeet' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'reception', label: 'Reception' },
  { value: 'prewedding', label: 'Pre-wedding' }
];

const people: Array<{ value: PersonType; label: string }> = [
  { value: 'girl', label: 'Girl' },
  { value: 'boy', label: 'Boy' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' }
];

const themes = ['royal modern', 'floral pastel', 'minimal luxe', 'heritage glam'];
const colors = ['yellow', 'green', 'red', 'champagne', 'blush', 'ivory'];
const ageRanges = ['3-8', '9-16', '18-25', '18-35', '26-35', '36-50', '50+'];
const stores: Array<StoreName | 'All'> = ['All', 'Myntra', 'AJIO', 'Flipkart'];
const quickPrompts = [
  'Man search under 4000 haldi dress',
  'Women mehndi outfit in green under 8000',
  'Girl wedding lehenga under 3000',
  'Boy reception look under 2500',
  'Pre-wedding pastel look for women under 6000'
];
const colorSwatches: Record<string, string> = {
  yellow: '#d8a51f',
  green: '#247a52',
  red: '#a5202d',
  champagne: '#d8c3a5',
  blush: '#e6a7b3',
  ivory: '#fff8e8',
  gold: '#c99a43',
  pastel: '#d9c8f0',
  wine: '#6d1838',
  silver: '#c7ccd3'
};

export function WeddingPlanner({ initialProducts, initialPreferences }: WeddingPlannerProps) {
  const [preferences, setPreferences] = useState<Required<PlannerPreferences>>(initialPreferences);
  const [products, setProducts] = useState<RankedProduct[]>(initialProducts);
  const [message, setMessage] = useState('I need a Haldi outfit around ₹5k and I like pastels.');
  const [storeFilter, setStoreFilter] = useState<StoreName | 'All'>('All');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Pick a quick search or type your own brief. I will show a ranked shopping list with store links.'
    }
  ]);
  const [moodboard, setMoodboard] = useState<PlannerResponse['moodboard']>({
    title: 'Haldi royal modern moodboard',
    palette: ['yellow', 'ivory', 'gold', 'pastel'],
    notes: ['Breathable pieces, warm color, easy movement.']
  });
  const [isLoading, setIsLoading] = useState(false);

  const budgetLabel = useMemo(
    () => `₹${preferences.budgetMin.toLocaleString('en-IN')} - ₹${preferences.budgetMax.toLocaleString('en-IN')}`,
    [preferences.budgetMin, preferences.budgetMax]
  );
  const visibleProducts = useMemo(
    () => (storeFilter === 'All' ? products : products.filter(product => product.store === storeFilter)),
    [products, storeFilter]
  );

  function updatePreference<Key extends keyof Required<PlannerPreferences>>(key: Key, value: Required<PlannerPreferences>[Key]) {
    setPreferences(current => ({ ...current, [key]: value }));
  }

  async function runPlannerSearch(userText: string) {
    if (!userText.trim()) return;

    setIsLoading(true);
    setMessages(current => [...current, { role: 'user', text: userText }]);
    setStoreFilter('All');

    try {
      const response = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, preferences })
      });
      const data = (await response.json()) as PlannerResponse;

      setPreferences(data.inferredPreferences);
      setProducts(data.products);
      setMoodboard(data.moodboard);
      setMessages(current => [...current, { role: 'assistant', text: data.reply }]);
      setMessage('');
    } catch {
      setMessages(current => [
        ...current,
        {
          role: 'assistant',
          text: 'I could not reach the planner API. Keep the selections as they are and try again once the Next.js server is running.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitPlanner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runPlannerSearch(message.trim());
  }

  // Refresh the ranked grid whenever a panel filter changes — no chat message needed.
  async function applyFilters(next: Required<PlannerPreferences>) {
    setIsLoading(true);
    setStoreFilter('All');
    try {
      const response = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '', preferences: next })
      });
      const data = (await response.json()) as PlannerResponse;
      setProducts(data.products);
      setMoodboard(data.moodboard);
    } catch {
      /* keep current results if the request fails */
    } finally {
      setIsLoading(false);
    }
  }

  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const timer = setTimeout(() => applyFilters(preferences), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    preferences.theme,
    preferences.event,
    preferences.personType,
    preferences.ageRange,
    preferences.budgetMin,
    preferences.budgetMax,
    preferences.colorPreference
  ]);

  return (
    <main className="planner-page">
      <header className="planner-header">
        <a className="brand" href="/">
          <span>V&V</span>
          Vow & Vogue
        </a>
        <nav>
          <a href="#planner">Planner</a>
          <a href="#products">Products</a>
          <a href="#chat">AI Chat</a>
        </nav>
      </header>

      <section className="planner-hero">
        <div>
          <p className="eyebrow">Wedding planner</p>
          <h1>Build a wedding edit</h1>
          <p className="hero-copy">Theme, event, person, age, budget and color come together as one ranked shopping brief.</p>
        </div>
      </section>

      <section className="planner-shell" id="planner">
        <aside className="control-panel" aria-label="Wedding planner filters">
          <div className="panel-heading">
            <p className="eyebrow">Planner inputs</p>
            <h2>Style brief</h2>
          </div>

          <fieldset>
            <legend>Theme</legend>
            <div className="segmented-grid">
              {themes.map(theme => (
                <button
                  className={preferences.theme === theme ? 'is-selected' : ''}
                  key={theme}
                  type="button"
                  onClick={() => updatePreference('theme', theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Event</legend>
            <div className="chip-grid">
              {events.map(item => (
                <button
                  className={preferences.event === item.value ? 'is-selected' : ''}
                  key={item.value}
                  type="button"
                  onClick={() => updatePreference('event', item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Person</legend>
            <div className="person-grid">
              {people.map(item => (
                <button
                  className={preferences.personType === item.value ? 'is-selected' : ''}
                  key={item.value}
                  type="button"
                  onClick={() => updatePreference('personType', item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="two-fields">
            <label>
              Age range
              <select value={preferences.ageRange} onChange={event => updatePreference('ageRange', event.target.value)}>
                {ageRanges.map(range => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Color
              <select value={preferences.colorPreference} onChange={event => updatePreference('colorPreference', event.target.value)}>
                {colors.map(color => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset>
            <legend>Budget range</legend>
            <div className="budget-row">
              <label>
                Min
                <input
                  min="0"
                  step="500"
                  type="number"
                  value={preferences.budgetMin}
                  onChange={event => updatePreference('budgetMin', Number(event.target.value))}
                />
              </label>
              <label>
                Max
                <input
                  min="1000"
                  step="500"
                  type="number"
                  value={preferences.budgetMax}
                  onChange={event => updatePreference('budgetMax', Number(event.target.value))}
                />
              </label>
            </div>
            <div className="budget-meter">
              <span>{budgetLabel}</span>
            </div>
          </fieldset>
        </aside>

        <section className="workspace">
          <section className="chat-panel" id="chat">
            <div className="panel-heading">
              <p className="eyebrow">AI chat planner</p>
              <h2>{moodboard.title}</h2>
            </div>
            <div className="palette-row" aria-label="Moodboard palette">
              {moodboard.palette.map(color => (
                <span key={color} style={{ background: colorSwatches[color] || color }} title={color} />
              ))}
            </div>
            <div className="quick-prompts" aria-label="Quick planner searches">
              {quickPrompts.map(prompt => (
                <button key={prompt} type="button" onClick={() => runPlannerSearch(prompt)} disabled={isLoading}>
                  {prompt}
                </button>
              ))}
            </div>
            <div className="chat-log" aria-live="polite">
              {messages.map((item, index) => (
                <p className={item.role} key={`${item.role}-${index}`}>
                  {item.text}
                </p>
              ))}
            </div>
            <form className="chat-form" onSubmit={submitPlanner}>
              <input
                aria-label="Planner message"
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder="Example: Man search under 4000 haldi dress"
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? '...' : '↗'}
              </button>
            </form>
          </section>

          <section className="products-panel" id="products">
            <div className="products-heading">
              <div>
                <p className="eyebrow">Top 10 product results</p>
                <h2>
                  {events.find(item => item.value === preferences.event)?.label} for {people.find(item => item.value === preferences.personType)?.label}
                </h2>
              </div>
              <strong>{visibleProducts.length} shown</strong>
            </div>
            <div className="store-tabs" aria-label="Filter products by store">
              {stores.map(store => (
                <button className={storeFilter === store ? 'is-selected' : ''} key={store} type="button" onClick={() => setStoreFilter(store)}>
                  {store}
                </button>
              ))}
            </div>
            <div className="product-grid">
              {visibleProducts.map(product => (
                <a
                  aria-label={`${product.productUrl ? 'Buy' : 'Search for'} ${product.name} on ${product.store}`}
                  className="product-card"
                  href={product.productUrl || product.searchUrl}
                  key={product.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={event => {
                        event.currentTarget.src = '/assets/hero-3d-editorial.png';
                      }}
                    />
                    <span>{product.matchScore}% match</span>
                  </div>
                  <div className="product-body">
                    <div>
                      <strong>{product.name}</strong>
                      <small>{product.category}</small>
                    </div>
                    <div className="product-meta">
                      <b>₹{product.price.toLocaleString('en-IN')}</b>
                      <span>{product.store}</span>
                      <span>{product.rating}★</span>
                    </div>
                    <p>{product.rankReason}</p>
                    <p className="review-summary">“{product.reviewSummary}”</p>
                    <span className="shop-cta">{product.productUrl ? `Buy on ${product.store}` : `Search on ${product.store}`}</span>
                  </div>
                </a>
              ))}
            </div>
            {!visibleProducts.length && <p className="empty-state">No products found for this store. Try All stores or a higher budget.</p>}
          </section>
        </section>
      </section>
    </main>
  );
}
