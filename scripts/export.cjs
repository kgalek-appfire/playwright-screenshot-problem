const playwright = require('playwright');

async function main() {
	const BROWSER_SETTINGS = [
		'--autoplay-policy=user-gesture-required',
		'--disable-background-networking',
		'--disable-background-timer-throttling',
		'--disable-backgrounding-occluded-windows',
		'--disable-breakpad',
		'--disable-client-side-phishing-detection',
		'--disable-component-update',
		'--disable-default-apps',
		'--disable-dev-shm-usage',
		'--disable-domain-reliability',
		'--disable-extensions',
		'--disable-features=AudioServiceOutOfProcess',
		'--disable-hang-monitor',
		'--disable-ipc-flooding-protection',
		'--disable-notifications',
		'--disable-offer-store-unmasked-wallet-cards',
		'--disable-popup-blocking',
		'--disable-print-preview',
		'--disable-prompt-on-repost',
		'--disable-renderer-backgrounding',
		'--disable-setuid-sandbox',
		'--disable-speech-api',
		'--disable-sync',
		'--hide-scrollbars',
		'--ignore-gpu-blacklist',
		'--metrics-recording-only',
		'--mute-audio',
		'--no-default-browser-check',
		'--no-first-run',
		'--no-pings',
		'--no-sandbox',
		'--no-zygote',
		'--password-store=basic',
		'--use-gl=swiftshader',
		'--use-mock-keychain',
		'--font-render-hinting=none',
		'--force-color-profile=srgb',
	];

	const browser = await playwright.chromium.launch({
		args: BROWSER_SETTINGS,
		headless: true
	});


	const browserContext = await browser.newContext({ignoreHTTPSErrors: true});
	const page = await browserContext.newPage();

	// This big export is not necessary, but it's an easy way to present the problem
	// Feel free to change it during tests
	const width = 20_000;
	const height = 20_000;

	console.log('Open page');

	await page.goto(`http://localhost:5173/?width=${width}&height=${height}`, {timeout: 0, waitUntil: 'networkidle'});
	await page.setViewportSize({width, height: height + 200});

	console.log('Viewport ready!');

	await page.waitForFunction(
		count => document.querySelectorAll('.test-element').length === count,
		(width / 100) * (height / 20)
	);

	// It's not necessary, but I'm adding some time to be sure that everything is rendered
	await page.waitForTimeout(5000);

	console.log('All elements rendered!');

	await page.screenshot({type: 'png', path: '1.result.png'});
	console.log('1.result.png done!');

	await page.screenshot({type: 'png', path: '2.result.png'});
	console.log('2.result.png done!');

	await page.screenshot({type: 'png', path: '3.result.png'});
	console.log('3.result.png done!');

	console.log('Done!')

	await page.close();
	await browser.close();

}

main()
	.catch(console.error)