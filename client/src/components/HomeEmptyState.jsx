import React from 'react'
import { Command, Check, AlertCircle, Plus } from 'lucide-react'

const HomeEmptyState = ({ onNewChat }) => {

    const capabilities = [
        'Explain complex concepts in simple language.',
        'Help write, debug, and understand code.',
        'Assist with learning and research.',
    ];

    const limitations = [
        'AI responses can sometimes be inaccurate.',
        'Important information should be verified.',
        'It may misunderstand unclear instructions.'
    ];
    return (
        <section className="home-empty">
            <div className="home-empty__container">

                {/* Application Branding */}
                <header className="home-empty__header">
                    <div className="home-empty__logo">
                        <Command size={48} strokeWidth={1.8} />
                    </div>

                    <h1 className="home-empty__title">iCommand</h1>
                    <p className="home-empty__subtitle">Your AI-powered conversation space.</p>
                </header>

                {/* Capabilities and Limitations */}
                <div className="home-empty__information">

                    <article className="home-empty__card">
                        <div className="home-empty__card-header">
                            <Check size={19} />
                            <h2>What iCommand can do</h2>
                        </div>

                        <ul className="home-empty__list">
                            {capabilities.map((item, index) => (
                                <li key={index}>
                                    <Check size={16} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    <article className="home-empty__card">
                        <div className="home-empty__card-header">
                            <AlertCircle size={19} />
                            <h2>Things to keep in mind</h2>
                        </div>

                        <ul className="home-empty__list">
                            {limitations.map((item, index) => (
                                <li key={index}>
                                    <AlertCircle size={16} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                </div>


            </div>
        </section>
    )
}

export default HomeEmptyState
