import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = '立石子ちゃん';
export const siteTitle = '立石子ちゃんNext.jsお試し';

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <Link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content='Next.jsのチュートリアルに沿って手を動かした'
                />
                <meta name='og:title' content={siteTitle} />
                <meta name='twitter:card' content='summary_large_image' />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                        priority
                        src="/images/profile.jpg"
                        className={utilStyles.borderCircle}
                        height={144}
                        width={144}
                        alt=""
                        />
                        <h1 className={utilStyles.heading2X1}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/profile.jpg"
                                className={utilStyles.borderCircle}
                                height={108}
                                width={108}
                                alt=""
                            />
                        </Link> 
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/" className={utilStyles.colorInHerit}>
                                {name}
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← ホームに戻る</Link>
                </div>
            )}
        </div>
    );
}