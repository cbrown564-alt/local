#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";
const builtPath = path.join(projectRoot, "dist", "concepts", "dundrum-physio", "index.html");
if (!existsSync(builtPath)) { console.error("Missing build"); process.exit(1); }
const html = readFileSync(builtPath, "utf8");
const text = html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<!--[\s\S]*?-->/g," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
const failures=[]; const check=(l,c)=>{ if(!c) failures.push(l); };
check("door", text.includes("12 Parterre Crescent") && text.includes("BT33 0WJ"));
check("phone", text.includes("028 4375 0848") || html.includes("tel:+442843750848"));
check("handoff", /dundrumphysio\.co\.uk/.test(html));
check("hero", html.includes("dundrum-physio-hero-parterre.jpg"));
check("no form", !/<form/i.test(html));
if (failures.length) { console.error("FAIL", failures); process.exit(1); }
console.log("test-dundrum-physio-elevation: OK");
