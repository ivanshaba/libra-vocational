import { useEffect } from "react";

export function GoogleTranslate() {
	useEffect(() => {
		// This ensures the translate element is properly initialized
		const translateElement = document.getElementById("google_translate_element");
		if (translateElement && !translateElement.children.length) {
			// @ts-ignore
			if (window.googleTranslateElementInit) {
				// @ts-ignore
				window.googleTranslateElementInit();
			}
		}
	}, []);

	return <div id="google_translate_element" className="fixed top-20 right-4 z-50" />;
}
