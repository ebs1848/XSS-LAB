# XSS LAB

A hands-on lab demonstrating the difference between `innerHTML` (vulnerable) and 
`textContent` (safe) when rendering user input, built to visualize XSS attack 
surface in a browser environment.

- **15 working payloads**: `onerror`, `ontoggle`, `onmouseover`, `autofocus`, 
  `javascript:` href, etc.
- **14 blocked payloads**: `svg onload`, `script` tag, `iframe`/`object` 
  `javascript:`, etc. — blocked by default in HTML5 and modern browsers 
  (Chrome/Edge).
- Includes a **custom payload field** to write and test your own payloads.

