'use client';

import { FormEvent, useMemo, useState } from 'react';
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
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'];
const bodyTypes = ['Petite', 'Straight', 'Curvy', 'Athletic', 'Plus size', 'Prefer not to say'];
const skinTones = ['Fair', 'Light', 'Medium', 'Olive', 'Dusky', 'Deep', 'Prefer not to say'];
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

const inspirationLooks = [
  {
    event: 'Haldi',
    title: 'Vibrant Sunshine',
    detail: 'Yellow mirror-work lehenga',
    match: 98,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhiWp9IsXPALeWvlFvSfCefw-vJBa482dpVlT7pH0IHwpbmcs4Kt3PvkWKhTqBNvcMCr7nx-RBNDreN-Xi20g7MR-2ERGzZnWtOQtBIzTUux0uDYD84lTvxuuP-Q1_TDeE_pQXVsb4mEcUR44Nb5nSMQU8y49CIZ8pbBhLW7YSYGLNCBEurFyQtyL-VzjOGL8RJGM1Mp9g-FNTI9fnnFOuLerHrdfOgXygyvJiCk1cZ6N7O60M2NOMSg'
  },
  {
    event: 'Mehndi',
    title: 'Emerald Elegance',
    detail: 'Green embroidered anarkali',
    match: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0H6BYj7XPGvvdSIgj58nA43PNYZB3p1FWaeySfFo2U5G6e0xAPMOMtqKNEwKZ3Wo8bMcKh5PCHRrSZ7SLY69S_Qo8qCEg6CvQy4FrK9ns9YCym5qA3snp_ahyOrKZMPkLxOYsnMu-XxfhILMfKt9dJoE_l7vNrS-ArVPCH6Wo2KbMueCF0hXRBL6m9ZDWSzYLmiI4F4uueUc5ZjWj83gtYdB7AZMco0IRsQ-5Z7i7IL-1SGqmCdwDFw'
  },
  {
    event: 'Wedding',
    title: 'Regal Maroon',
    detail: 'Classic zardosi lehenga',
    match: 99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxpwuGsweQnbbAcM9GglgxRzQL91a6r7M5fcuX_md-LF9uhG1nkY4aeU-DRbrA80wKzWyVmn02z4rUMSMs-AKieF8wATcwCJ37pMFB4YiaSDdb9myAt09vsdJzmwSYxyvaLDM5hr3ze3_8dJsVW8V3pZVmi3XTiCiI-FsjWGDiXIz9kzmLkRIDkHmZ-shqlwKUOWKU7yEDqgm106DE8UJaqWojf60AzSJ2AKO1Cqj5ScjkkaMSg5cgzA'
  },
  {
    event: 'Reception',
    title: 'Champagne Sparkle',
    detail: 'Contemporary sequin gown',
    match: 92,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-2VungN-gwnTrPaT2-e3SVy_J9vjz9Sf276aSNsFc9HORQk2DKvBmWepW5IBRag4pZTBASKP_Tt4Pnb2QPe2d9DzFiP3G6uJR2cbQattK8jA2CaExcotWL2XA15WN4FDBkwBpjQwOWkq1o1aIuvq_WJwJ6o9CaFzkIwab8kjXWAeayPBxGyTr3XXQbSzxRfrBYRUZzbeVzVbPmBOcVZOsMItmmcza4jL96u8VQ93z4jKd4tO95zIbrQ'
  }
];

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
  const [journeyStep, setJourneyStep] = useState(0);
  const [journeyComplete, setJourneyComplete] = useState(false);
  const [size, setSize] = useState('M');
  const [bodyType, setBodyType] = useState('Curvy');
  const [skinTone, setSkinTone] = useState('Medium');
  const [photoName, setPhotoName] = useState('');

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

  async function generateCompleteLook() {
    const eventLabel = events.find(item => item.value === preferences.event)?.label || preferences.event;
    const personLabel = people.find(item => item.value === preferences.personType)?.label || preferences.personType;
    const brief = `Create a complete ${preferences.theme} ${eventLabel} look for ${personLabel}, age ${preferences.ageRange}, size ${size}, ${bodyType} body type, ${skinTone} skin tone, in ${preferences.colorPreference}, between ₹${preferences.budgetMin} and ₹${preferences.budgetMax}. Include outfit and coordinating accessory guidance.`;
    setJourneyComplete(true);
    setMessage('');
    await runPlannerSearch(brief);
  }

  return (
    <main className="planner-page">
      <header className="planner-header">
        <a className="brand" href="/">
          Vivaah AI
        </a>
        <nav>
          <a href="#heritage">Heritage</a>
          <a className="active" href="#planner">Stylist</a>
          <a href="#showcase">Showcase</a>
          <a href="#planner">Events</a>
        </nav>
        <div className="header-actions" aria-label="Account actions"><span>♡</span><span>◎</span></div>
      </header>

      <section className="planner-hero">
        <div className="hero-card">
          <p className="eyebrow">Your personal AI stylist</p>
          <h1>Find Your Perfect Wedding Look in 60 Seconds</h1>
          <p className="hero-copy">AI-powered outfit ideas for Haldi, Mehndi, Sangeet, Wedding Day, Reception and more.</p>
          <a className="primary-cta" href="#planner">Start Styling Me <span>→</span></a>
        </div>
      </section>

      <section className="how-it-works" id="heritage">
        <div className="section-heading"><p className="eyebrow">Effortlessly personal</p><h2>How It Works</h2><p>Your personalized styling journey in three simple steps.</p></div>
        <div className="steps-grid">
          <article><span>01</span><div className="step-icon">♙</div><h3>Tell Us About You</h3><p>Share your preferences, age, budget and the wedding event you are attending.</p></article>
          <article><span>02</span><div className="step-icon">✦</div><h3>AI Magic</h3><p>Our stylist analyzes thousands of combinations to curate looks tailored to you.</p></article>
          <article><span>03</span><div className="step-icon">♢</div><h3>Discover & Shop</h3><p>Review your bespoke outfits, compare matches and shop directly from trusted stores.</p></article>
        </div>
      </section>

      <section className="inspiration" id="showcase">
        <div className="section-heading left"><p className="eyebrow">Curated inspiration</p><h2>Popular Wedding Looks</h2><p>Modern heritage for every ceremony.</p></div>
        <div className="look-grid">
          {inspirationLooks.map(look => <article className="look-card" key={look.title}>
            <div className="look-image"><img src={look.image} alt={look.detail} /><span className={`event-tag ${look.event.toLowerCase()}`}>{look.event}</span></div>
            <div className="look-body"><div><h3>{look.title}</h3><p>{look.detail}</p></div><strong>✦ {look.match}% Match</strong></div>
          </article>)}
        </div>
      </section>

      <div className="stylist-intro"><p className="eyebrow">AI styling atelier</p><h2>Create Your Curated Look</h2><p>Set your preferences or describe exactly what you need. Your recommendations update instantly.</p></div>

      <section className={`planner-shell ${journeyComplete ? 'has-results' : 'journey-only'}`} id="planner">
        <section className="consultation-panel" aria-label="Personal styling consultation">
          <div className="journey-topline"><span>Personal styling consultation</span><strong>{journeyStep + 1} / 8</strong></div>
          <div className="journey-progress"><span style={{ width: `${((journeyStep + 1) / 8) * 100}%` }} /></div>

          <div className="journey-step" key={journeyStep}>
            {journeyStep === 0 && <><p className="eyebrow">Let’s begin</p><h2>Who are you styling?</h2><p>Choose the person who will wear this look.</p><div className="choice-grid four">{people.map(item => <button className={preferences.personType === item.value ? 'is-selected' : ''} key={item.value} type="button" onClick={() => updatePreference('personType', item.value)}><span>{item.value === 'women' ? '♕' : item.value === 'men' ? '♙' : '✦'}</span>{item.label}</button>)}</div></>}
            {journeyStep === 1 && <><p className="eyebrow">The celebration</p><h2>Which ceremony?</h2><p>Every event has its own palette, energy and traditions.</p><div className="choice-grid events">{events.map(item => <button className={preferences.event === item.value ? 'is-selected' : ''} key={item.value} type="button" onClick={() => updatePreference('event', item.value)}><span>✦</span>{item.label}</button>)}</div></>}
            {journeyStep === 2 && <><p className="eyebrow">Fit profile</p><h2>What age and size?</h2><p>This helps us prioritize comfortable silhouettes and relevant products.</p><div className="form-pair"><label>Age range<select value={preferences.ageRange} onChange={event => updatePreference('ageRange', event.target.value)}>{ageRanges.map(range => <option key={range}>{range}</option>)}</select></label><label>Usual size<select value={size} onChange={event => setSize(event.target.value)}>{sizes.map(item => <option key={item}>{item}</option>)}</select></label></div></>}
            {journeyStep === 3 && <><p className="eyebrow">Investment</p><h2>What is your budget?</h2><p>Set the total range you would like us to work within.</p><div className="form-pair"><label>Minimum<input min="0" step="500" type="number" value={preferences.budgetMin} onChange={event => updatePreference('budgetMin', Number(event.target.value))}/></label><label>Maximum<input min="1000" step="500" type="number" value={preferences.budgetMax} onChange={event => updatePreference('budgetMax', Number(event.target.value))}/></label></div><div className="budget-highlight">Your range <strong>{budgetLabel}</strong></div></>}
            {journeyStep === 4 && <><p className="eyebrow">Your palette</p><h2>Which colors do you love?</h2><p>Select the lead color for your curated look.</p><div className="color-choice-grid">{colors.map(color => <button aria-label={color} className={preferences.colorPreference === color ? 'is-selected' : ''} key={color} type="button" onClick={() => updatePreference('colorPreference', color)}><i style={{background:colorSwatches[color]}} />{color}</button>)}</div></>}
            {journeyStep === 5 && <><p className="eyebrow">Personal details</p><h2>Body type and skin tone</h2><p>These details help refine silhouettes and complementary colors.</p><div className="form-pair"><label>Body type<select value={bodyType} onChange={event => setBodyType(event.target.value)}>{bodyTypes.map(item => <option key={item}>{item}</option>)}</select></label><label>Skin tone<select value={skinTone} onChange={event => setSkinTone(event.target.value)}>{skinTones.map(item => <option key={item}>{item}</option>)}</select></label></div><p className="privacy-note">Used only for this recommendation. You can always choose “Prefer not to say.”</p></>}
            {journeyStep === 6 && <><p className="eyebrow">Aesthetic direction</p><h2>What feels most like you?</h2><p>Choose the style language for your look.</p><div className="choice-grid themes">{themes.map(theme => <button className={preferences.theme === theme ? 'is-selected' : ''} key={theme} type="button" onClick={() => updatePreference('theme', theme)}><span>✧</span>{theme}</button>)}</div></>}
            {journeyStep === 7 && <><p className="eyebrow">Final touch</p><h2>Add a reference photo</h2><p>Optional: upload an inspiration photo or an outfit you already own.</p><label className="photo-upload"><input accept="image/*" type="file" onChange={event => setPhotoName(event.target.files?.[0]?.name || '')}/><span>{photoName ? '✓' : '＋'}</span><strong>{photoName || 'Choose an image'}</strong><small>{photoName ? 'Ready to use as inspiration' : 'JPG, PNG or WEBP · optional'}</small></label><div className="brief-summary"><span>{people.find(item => item.value === preferences.personType)?.label}</span><span>{events.find(item => item.value === preferences.event)?.label}</span><span>{preferences.colorPreference}</span><span>{preferences.theme}</span><span>{budgetLabel}</span></div></>}
          </div>

          <div className="journey-actions">
            <button className="back-button" type="button" disabled={journeyStep === 0 || isLoading} onClick={() => setJourneyStep(step => step - 1)}>← Back</button>
            {journeyStep < 7 ? <button className="next-button" type="button" onClick={() => setJourneyStep(step => step + 1)}>Continue →</button> : <button className="next-button generate" type="button" disabled={isLoading} onClick={generateCompleteLook}>{isLoading ? 'Curating your look…' : '✦ Generate My Complete Look'}</button>}
          </div>
        </section>

        <section className={`workspace ${journeyComplete ? '' : 'results-hidden'}`}>
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
      <footer className="site-footer"><div><strong>Vivaah AI</strong><p>Where modern heritage meets AI precision.</p></div><p>Curating your perfect Indian wedding wardrobe.</p></footer>
    </main>
  );
}
