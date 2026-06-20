// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// به تایپ‌اسکریپت می‌گوید که وارد کردن فایل‌های CSS به صورت Side-effect مجاز است
declare module '*.css' {
  const content: any;
  export default content;
}
export {};
