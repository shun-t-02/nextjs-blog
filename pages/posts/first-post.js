import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>first page</title>
            </Head>
            <h1>最初の投稿</h1>
            <p>2023/6/24 作ってみた</p>
        </Layout>
    )
}