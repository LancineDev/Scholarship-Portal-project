import { Helmet } from "react-helmet-async";

const WHATSAPP_LINK =
    "https://wa.me/2250712129409?text=Bonjour%2010bourse,%0A%0AJe%20suis%20int%C3%A9ress%C3%A9(e)%20par%20votre%20service%20d%27assistance%20professionnelle%20(9%20995%20F%20CFA).%0A%0AVoici%20mes%20informations%20:%0A- Nom%20complet%20:%0A- Pays%20:%0A- Nom%20de%20la%20bourse%20:%0A- Date%20limite%20:%0A%0AMerci%20de%20me%20guider%20pour%20la%20suite.";

const STEPS = [
    { number: "01", icon: "💬", title: "Contactez-nous",              desc: "Cliquez sur le bouton WhatsApp. Un message pré-rempli sera envoyé à notre équipe avec vos informations." },
    { number: "02", icon: "📋", title: "Évaluation de votre dossier", desc: "Nos experts analysent votre profil et la bourse visée pour vous proposer la meilleure stratégie." },
    { number: "03", icon: "💳", title: "Paiement sécurisé",           desc: "Réglez les frais d'assistance via Mobile Money ou virement. Simple et rapide." },
    { number: "04", icon: "🎯", title: "Accompagnement complet",      desc: "Nous vous guidons pas à pas jusqu'à la soumission finale de votre candidature." },
];

const BENEFITS = [
    { icon: "✍️", title: "Rédaction de la lettre de motivation", desc: "Une lettre personnalisée, percutante et adaptée aux attentes du jury." },
    { icon: "📄", title: "Mise en forme du CV",                  desc: "Un CV académique conforme aux standards internationaux." },
    { icon: "🔍", title: "Vérification complète du dossier",     desc: "Relecture et correction de tous vos documents avant soumission." },
    { icon: "🗓️", title: "Suivi des délais",                     desc: "Nous veillons à ce que votre candidature soit soumise dans les temps." },
    { icon: "🌍", title: "Traduction si nécessaire",             desc: "Traduction de vos documents en anglais ou en français selon les exigences." },
    { icon: "📞", title: "Support dédié",                        desc: "Un conseiller disponible pour répondre à toutes vos questions." },
];

const FAQS = [
    { q: "Combien coûte le service d'assistance ?",              a: "Le service est proposé à 9 995 F CFA (environ 15 €). Ce tarif couvre l'ensemble de l'accompagnement jusqu'à la soumission de votre dossier." },
    { q: "Dans quel délai puis-je recevoir mon dossier finalisé ?", a: "En général, nous finalisons votre dossier en 3 à 5 jours ouvrables après réception de tous vos documents." },
    { q: "Quels documents dois-je fournir ?",                    a: "Relevés de notes, diplômes, CV, pièce d'identité, et tout document spécifique à la bourse visée. Notre équipe vous guidera précisément." },
    { q: "Le service est-il disponible pour toutes les bourses ?", a: "Oui, nous accompagnons les candidatures pour toutes les bourses référencées sur 10bourse ainsi que d'autres opportunités internationales." },
];

const WhatsAppIcon = ({ size = 20 }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

const AssistanceService = () => (
    <>
        <Helmet>
            <title>Assistance Professionnelle | 10bourse</title>
            <meta name="description" content="Maximisez vos chances d'obtenir une bourse avec l'aide de nos experts. Accompagnement complet pour 9 995 F CFA." />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Helmet>

        <style>{`
            .ap { font-family: 'DM Sans', sans-serif; color: #0f172a; }

            /* HERO */
            .ap-hero { position: relative; background: #0f172a; overflow: hidden; padding: 96px 24px 80px; text-align: center; }
            .ap-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 20% 50%, rgba(26,60,143,0.45) 0%, transparent 65%), radial-gradient(ellipse 40% 60% at 80% 30%, rgba(15,122,90,0.25) 0%, transparent 60%); pointer-events: none; }
            .ap-hero::after  { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }
            .ap-hero-inner   { position: relative; z-index: 2; max-width: 720px; margin: 0 auto; }
            .ap-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(15,122,90,0.15); border: 1px solid rgba(15,122,90,0.3); color: #34d399; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 28px; animation: fadeUp .4s ease both; }
            .ap-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 700; line-height: 1.1; color: #fff; margin-bottom: 20px; animation: fadeUp .45s .05s ease both; }
            .ap-hero h1 span { color: #34d399; }
            .ap-hero p  { font-size: 16px; font-weight: 300; line-height: 1.8; color: rgba(255,255,255,0.55); max-width: 540px; margin: 0 auto 40px; animation: fadeUp .45s .1s ease both; }
            .ap-price   { display: inline-flex; flex-direction: column; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); border-radius: 18px; padding: 20px 40px; margin-bottom: 36px; animation: fadeUp .45s .15s ease both; }
            .ap-price .plabel { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 4px; }
            .ap-price .pamount { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 700; color: #fff; line-height: 1; }
            .ap-price .psub { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 4px; }
            .ap-cta { display: flex; flex-direction: column; align-items: center; gap: 12px; animation: fadeUp .45s .2s ease both; }
            .ap-note { font-size: 12px; color: rgba(255,255,255,0.25); }

            /* WHATSAPP BUTTON */
            .btn-wa { display: inline-flex; align-items: center; gap: 10px; background: #25d366; color: #fff; font-size: 15px; font-weight: 600; padding: 16px 36px; border-radius: 14px; text-decoration: none; box-shadow: 0 8px 32px rgba(37,211,102,0.35); transition: all .22s ease; position: relative; overflow: hidden; }
            .btn-wa::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 100%); opacity: 0; transition: opacity .22s; }
            .btn-wa:hover  { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(37,211,102,0.45); }
            .btn-wa:hover::after { opacity: 1; }

            /* TRUST STRIP */
            .ap-trust { background: #fff; border-bottom: 1px solid #f1f5f9; padding: 20px 24px; }
            .ap-trust-inner { max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 32px; }
            .trust-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #475569; }

            /* SECTIONS */
            .sec { padding: 80px 24px; }
            .sec-light { background: #f8fafc; }
            .sec-white { background: #fff; }
            .sec-in    { max-width: 1080px; margin: 0 auto; }
            .sec-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1A3C8F; margin-bottom: 10px; }
            .sec-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; color: #0f172a; line-height: 1.2; margin-bottom: 14px; }
            .sec-sub   { font-size: 15px; font-weight: 300; line-height: 1.8; color: #64748b; max-width: 540px; margin-bottom: 52px; }

            /* STEPS */
            .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2px; background: #e2e8f0; border-radius: 20px; overflow: hidden; }
            .step-card  { background: #fff; padding: 32px 28px; position: relative; }
            .step-num   { font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 700; color: #f1f5f9; line-height: 1; position: absolute; top: 20px; right: 20px; }
            .step-icon  { font-size: 28px; margin-bottom: 14px; display: block; }
            .step-line  { width: 28px; height: 3px; background: linear-gradient(90deg, #1A3C8F, #0F7A5A); border-radius: 2px; margin-bottom: 16px; }
            .step-title { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 8px; }
            .step-desc  { font-size: 13.5px; font-weight: 300; color: #64748b; line-height: 1.7; }

            /* BENEFITS */
            .benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
            .benefit-card  { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; transition: all .2s ease; display: flex; gap: 16px; align-items: flex-start; }
            .benefit-card:hover { border-color: #1A3C8F; box-shadow: 0 4px 20px rgba(26,60,143,0.08); transform: translateY(-2px); }
            .benefit-icon  { width: 42px; height: 42px; flex-shrink: 0; border-radius: 10px; background: #eff6ff; border: 1px solid #dbeafe; display: flex; align-items: center; justify-content: center; font-size: 18px; }
            .benefit-title { font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 4px; }
            .benefit-desc  { font-size: 13px; font-weight: 300; color: #64748b; line-height: 1.6; }

            /* FAQ */
            .faq-list { display: flex; flex-direction: column; gap: 12px; max-width: 720px; }
            .faq-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px 24px; }
            .faq-q    { font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start; }
            .faq-q::before { content: 'Q'; font-size: 10px; font-weight: 700; background: #1A3C8F; color: #fff; padding: 2px 7px; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
            .faq-a    { font-size: 13.5px; font-weight: 300; color: #64748b; line-height: 1.75; padding-left: 28px; }

            /* BOTTOM CTA */
            .ap-cta-sec { background: linear-gradient(135deg, #0f172a 0%, #1A3C8F 60%, #0F7A5A 100%); padding: 80px 24px; text-align: center; position: relative; overflow: hidden; }
            .ap-cta-sec::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 24px 24px; }
            .ap-cta-in  { position: relative; z-index: 2; max-width: 560px; margin: 0 auto; }
            .ap-cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #fff; margin-bottom: 14px; }
            .ap-cta-sub   { font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.55); margin-bottom: 36px; line-height: 1.7; }

            @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
            @media (max-width: 640px) {
                .steps-grid { grid-template-columns: 1fr; background: transparent; gap: 12px; }
                .step-card  { border-radius: 14px; border: 1px solid #e2e8f0; }
                .ap-trust-inner { gap: 16px; }
            }
        `}</style>

        <div className="ap">

          

        

          

            {/* BENEFITS */}
            <section className="sec sec-white">
                <div className="sec-in">
                    <div className="sec-eyebrow">Ce qui est inclus</div>
                    <h2 className="sec-title">Tout ce dont vous avez<br />besoin pour réussir</h2>
                    <p className="sec-sub">Notre accompagnement couvre chaque aspect de votre candidature.</p>
                    <div className="benefits-grid">
                        {BENEFITS.map(b => (
                            <div key={b.title} className="benefit-card">
                                <div className="benefit-icon">{b.icon}</div>
                                <div>
                                    <div className="benefit-title">{b.title}</div>
                                    <div className="benefit-desc">{b.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="ap-cta-sec">
                <div className="ap-cta-in">
                    <div className="ap-cta-title">Prêt à maximiser<br />vos chances ?</div>
                    <p className="ap-cta-sub">Rejoignez les candidats qui ont fait confiance à 10bourse pour décrocher leur bourse internationale.</p>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa">
                        <WhatsAppIcon /> Contacter sur WhatsApp
                    </a>
                </div>
            </section>

        </div>
    </>
);

export default AssistanceService;