import { createContext as e, useContext as t, useEffect as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region node_modules/@avaya/infinity-omni-sdk-core/lib/avaya-infinity-omni-sdk-core.js
var s = class extends Error {
	code;
	detail;
	metadata;
	constructor(e, t) {
		super(e.message, t), this.name = "AvayaInfinityOmniSdkError", this.code = e.code, this.detail = e.detail, this.metadata = t?.metadata;
	}
	static is(e) {
		if (typeof e != "object" || !e) return !1;
		let t = e;
		return t.name === "AvayaInfinityOmniSdkError" && typeof t.code == "string" && typeof t.message == "string";
	}
};
function c(e) {
	return `AvayaInfinityOmniSdkError :: ${e}`;
}
var l = {
	INVALID_ARGUMENT: "OSE_CORE_INVALID_ARGUMENT",
	SDK_NOT_INITIALIZED: "OSE_CORE_SDK_NOT_INITIALIZED",
	SESSION_INITIALIZED_ALREADY: "OSE_CORE_SESSION_INITIALIZED_ALREADY",
	SDK_BUSY: "OSE_CORE_SDK_BUSY",
	SDK_INIT_FAILED: "OSE_CORE_SDK_INIT_FAILED",
	CONVERSATION_NOT_ACTIVE: "OSE_CORE_CONVERSATION_NOT_ACTIVE",
	MALFORMED_SERVER_RESPONSE: "OSE_CORE_MALFORMED_SERVER_RESPONSE",
	SESSION_ENDED: "OSE_CORE_SESSION_ENDED",
	INVALID_JWT: "OSE_CORE_INVALID_JWT",
	CREATE_CONVERSATION_FAILED: "OSE_CORE_CREATE_CONVERSATION_FAILED",
	CONVERSATIONS_NOT_CLOSABLE: "OSE_CORE_CONVERSATIONS_NOT_CLOSABLE",
	MAX_CONVERSATIONS_REACHED: "OSE_CORE_MAX_CONVERSATIONS_REACHED"
}, u = {
	INVALID_LOG_LEVEL: {
		code: l.INVALID_ARGUMENT,
		detail: "invalid-log-level",
		message: "Invalid log level"
	},
	CONSTRAINT_VIOLATION: {
		code: l.INVALID_ARGUMENT,
		detail: "constraint-violation",
		message: c("Constraint violated")
	},
	SDK_NOT_INITIALIZED: {
		code: l.SDK_NOT_INITIALIZED,
		message: c("Omni SDK is not yet initialized")
	},
	SESSION_INITIALIZED_ALREADY: {
		code: l.SESSION_INITIALIZED_ALREADY,
		message: c("Session is initialized already")
	},
	SDK_BUSY: {
		code: l.SDK_BUSY,
		message: "Omni SDK is in process of initialization or shutdown, no operations are allowed until either is completed"
	},
	SDK_INIT_FAILED: {
		code: l.SDK_INIT_FAILED,
		message: "Failed to initialize the session"
	},
	CONVERSATION_CLOSING: {
		code: l.CONVERSATION_NOT_ACTIVE,
		detail: "conversation-closing",
		message: "Conversation is closing."
	},
	CONVERSATION_CLOSED: {
		code: l.CONVERSATION_NOT_ACTIVE,
		detail: "conversation-closed",
		message: "Conversation is closed."
	},
	PARTICIPANT_CHANNEL_MISSING: {
		code: l.MALFORMED_SERVER_RESPONSE,
		detail: "participant-channel-missing",
		message: "Missing required participant fields channel"
	},
	GET_SESSION_UNEXPECTED_STATUS: {
		code: l.MALFORMED_SERVER_RESPONSE,
		detail: "get-session-unexpected-status",
		message: c("Failed to get session. Received unexpected code from server")
	},
	SESSION_NOT_FOUND: {
		code: l.SESSION_ENDED,
		detail: "session-not-found",
		message: c("Session not found")
	},
	SESSION_POLLING_MAX_RETRIES_EXCEEDED: {
		code: l.SESSION_ENDED,
		detail: "session-polling-max-retries-exceeded",
		message: c("Session polling failed due to max number of retries exceeded")
	},
	TOKEN_EXPIRED: {
		code: l.INVALID_JWT,
		detail: "token-expired",
		message: c("JWT Token expired or not set")
	},
	INVALID_JWT_PROVIDED: {
		code: l.INVALID_JWT,
		detail: "invalid-jwt-provided",
		message: c("Invalid JWT PROVIDED")
	},
	CREATE_CONVERSATION_FAILED: {
		code: l.CREATE_CONVERSATION_FAILED,
		message: c("Failed to create conversation")
	},
	CONVERSATIONS_NOT_CLOSABLE: {
		code: l.CONVERSATIONS_NOT_CLOSABLE,
		message: c("Creating/Ending conversations is not permitted")
	},
	MAX_CONVERSATIONS_REACHED: {
		code: l.MAX_CONVERSATIONS_REACHED,
		message: c("Max conversations limit reached")
	}
};
function d(e) {
	return s.is(e) && e.code.startsWith("OSE_CORE_");
}
var f, p, m, h, g;
(function(e) {
	e.ERROR = "ERROR", e.WARN = "WARN", e.INFO = "INFO", e.DEBUG = "DEBUG", e.OFF = "OFF";
})(f ||= {}), function(e) {
	e.USER_INACTIVE = "USER_INACTIVE", e.USER_CLOSED = "USER_CLOSED", e.UNKNOWN = "UNKNOWN";
}(p ||= {}), function(e) {
	e.SESSION_NOT_FOUND = "Session not found";
}(m ||= {}), function(e) {
	e.CUSTOMER = "CUSTOMER", e.AGENT = "AGENT", e.SUPERVISOR = "SUPERVISOR", e.SYSTEM = "SYSTEM", e.BOT = "BOT";
}(h ||= {}), function(e) {
	e.JwtExpiry = "TokenExpiryTimer", e.JwtWarning = "TokenExpiryWarningTimer";
}(g ||= {});
var ee = /\b\d{13,19}\b/g, te = /[\w.+-]{1,64}@(?:[\w-]{1,63}\.){1,10}\w{2,24}/g, ne = /\+\d{10,15}/g, re = /\(\d{3}\)\s?\d{3}[-\s]?\d{4}/g, ie = /(?<![\w.])\+?(?:\d{1,3}\.)?\d{3}\.\d{3}\.\d{4}\b/g, ae = /\b[2-9]\d{2}[-\s]\d{3}[-\s]\d{4}\b/g;
function oe(e) {
	return e.includes("@") || e.includes("+") || e.includes("(") || /\d{13,}/.test(e) || /\d{3}[-.\s]\d{3}[-.\s]\d{4}/.test(e) ? e.replaceAll(ee, ((e) => function(e) {
		let t = 0, n = !1;
		for (let r = e.length - 1; r >= 0; r--) {
			let i = Number(e[r]);
			n && (i *= 2, i > 9 && (i -= 9)), t += i, n = !n;
		}
		return t % 10 == 0;
	}(e) ? "[REDACTED]" : e)).replaceAll(te, ((e) => {
		let t = e.indexOf("@");
		return `***@${e.slice(t + 1)}`;
	})).replaceAll(ne, ((e) => `***${e.slice(-4)}`)).replaceAll(re, ((e) => `***${e.slice(-4)}`)).replaceAll(ie, ((e) => `***${e.slice(-4)}`)).replaceAll(ae, ((e) => `***${e.slice(-4)}`)) : e;
}
function se(e) {
	return e && oe(e);
}
function ce(e, t = /* @__PURE__ */ new WeakSet(), n = 0) {
	if (!(e instanceof Error) || t.has(e)) return;
	if (n >= 8) return "Max error cause depth (8) reached, omitting further chain";
	t.add(e);
	let r = {
		name: e.name,
		message: se(e.message)
	};
	(function(e, t) {
		if (!s.is(e)) return;
		t.code = e.code, t.detail = e.detail;
		let n = se(JSON.stringify(e.metadata));
		if (e.metadata && n) try {
			t.metadata = JSON.parse(n);
		} catch {
			t.metadata = n;
		}
	})(e, r), e.stack !== void 0 && (r.stack = se(e.stack));
	let i = ce(e.cause, t, n + 1);
	return i && (r.cause = i), r;
}
var le = new class {
	#e;
	#t;
	#n = 0;
	#r = 0;
	constructor(e = 2e3) {
		this.#e = e, this.#t = Array(e);
	}
	get capacity() {
		return this.#e;
	}
	get size() {
		return this.#r;
	}
	push(e) {
		this.#t[this.#n] = e, this.#n = (this.#n + 1) % this.#e, this.#r < this.#e && this.#r++;
	}
	snapshot() {
		if (this.#r === 0) return [];
		let e = Array(this.#r), t = (this.#n - this.#r + this.#e) % this.#e;
		for (let n = 0; n < this.#r; n++) e[n] = this.#t[(t + n) % this.#e];
		return e;
	}
	clear() {
		this.#t = Array(this.#e), this.#n = 0, this.#r = 0;
	}
	resize(e) {
		if (e === this.#e) return { discardedCount: 0 };
		let t = this.snapshot(), n = Math.max(0, t.length - e), r = n > 0 ? t.slice(-e) : t;
		this.#e = e, this.#t = Array(e), this.#n = 0, this.#r = 0;
		for (let e of r) this.push(e);
		return { discardedCount: n };
	}
}();
function ue() {
	return le.snapshot();
}
function de() {
	le.clear();
}
var fe = class e {
	static level;
	name;
	prefix;
	static {
		this.level = f.WARN;
	}
	static setLevel(e) {
		this.level = e;
	}
	constructor(e, t = "AvayaInfinityOmniSdk") {
		this.name = e, this.prefix = t;
	}
	prepareLog(e, t, n, r, i) {
		let a = {
			sdkModule: this.prefix,
			"@timestamp": (/* @__PURE__ */ new Date()).toISOString(),
			loggerName: this.name,
			context: t,
			message: n,
			level: e
		};
		return r && (a.additionalDetails = r), i && (a.error = ce(i)), a;
	}
	prepareString(e) {
		return JSON.stringify(e, void 0, 2);
	}
	getLevel() {
		return e.level;
	}
	writeEntry(e, t) {
		switch (e) {
			case f.DEBUG:
				console.debug(t);
				break;
			case f.INFO:
				console.log(t);
				break;
			case f.WARN:
				console.warn(t);
				break;
			case f.ERROR:
				console.error(t);
				break;
			case f.OFF: break;
			default: console.log(t);
		}
	}
	writeEntries(e, t, ...n) {
		console.group(t);
		for (let t of n) this.writeEntry(e, t);
		console.groupEnd();
	}
	write(e, t, n, r, i, ...a) {
		let o = this.prepareLog(e, t, n, r, i), s = this.prepareString(o);
		le.push(o), a.length > 0 ? this.writeEntries(e, s, ...a) : this.writeEntry(e, s);
	}
	debug(t, n, r, ...i) {
		e.level === f.DEBUG && this.write(f.DEBUG, t, n, r, void 0, ...i);
	}
	info(e, t, n, ...r) {
		this.log(e, t, n, ...r);
	}
	log(t, n, r, ...i) {
		e.level !== f.DEBUG && e.level !== f.INFO || this.write(f.INFO, t, n, r, void 0, ...i);
	}
	warn(t, n, r, i, ...a) {
		e.level !== f.DEBUG && e.level !== f.INFO && e.level !== f.WARN || this.write(f.WARN, t, n, r, i, ...a);
	}
	error(t, n, r, i, ...a) {
		e.level !== f.OFF && this.write(f.ERROR, t, n, r, i, ...a);
	}
};
function _(e) {
	return new fe(e, "AvayaInfinityOmniSdkCore");
}
var v = class {
	name;
	handle;
	duration;
	onTimeoutListener;
	startTime;
	logger;
	constructor(e, t, n) {
		this.name = e, this.handle = void 0, this.duration = t, this.onTimeoutListener = n, this.startTime = void 0, this.logger = _("Timer");
	}
	get isRunning() {
		return this.handle !== void 0;
	}
	start() {
		this.isRunning ? this.logger.debug("start", `Timer ${this.name} is already running, ignoring the call.`, { timerName: this.name }) : (this.startTime = /* @__PURE__ */ new Date(), this.handle = setTimeout(this.handleTimeout.bind(this), this.duration), this.logger.debug("start", `Timer ${this.name} started.`, {
			timerName: this.name,
			duration: this.duration
		}));
	}
	setDuration(e) {
		this.isRunning ? this.logger.debug("setDuration", `Timer ${this.name} already running. Ignoring the call.`, { timerName: this.name }) : (this.duration = e, this.logger.debug("setDuration", `Timer ${this.name} duration updated.`, {
			timerName: this.name,
			duration: this.duration
		}));
	}
	getDuration() {
		return this.duration;
	}
	restart() {
		this.stop(), this.start();
	}
	stop() {
		if (this.isRunning) {
			let e = this.elapsedTime;
			clearTimeout(this.handle), this.cleanup(), this.logger.debug("stop", `Timer ${this.name} stopped.`, {
				timerName: this.name,
				elapsedTime: e
			});
		} else this.logger.debug("stop", `Timer ${this.name} is already stopped, ignoring the call.`, { timerName: this.name });
	}
	handleTimeout() {
		this.logger.debug("notifyListener", `Timer ${this.name} timed out.`, {
			timerName: this.name,
			duration: this.duration
		}), this.cleanup(), this.onTimeoutListener();
	}
	cleanup() {
		this.startTime = void 0, this.handle = void 0;
	}
	get elapsedTime() {
		return this.startTime ? (/* @__PURE__ */ new Date()).getTime() - this.startTime.getTime() : 0;
	}
	get remainingTime() {
		return this.isRunning && this.startTime ? this.duration - this.elapsedTime : (this.logger.debug("remainingTime", `Timer ${this.name} is not running.`, { timerName: this.name }), 0);
	}
}, y, b;
(function(e) {
	e.INITIALIZED = "INITIALIZED", e.SHUTDOWN = "SHUTDOWN", e.PARTICIPANT_ADDED = "PARTICIPANT_ADDED", e.PARTICIPANT_DISCONNECTED = "PARTICIPANT_DISCONNECTED", e.IDLE_TIMEOUT = "IDLE_TIMEOUT", e.JWT_STATE_CHANGED = "JWT_STATE_CHANGED", e.SESSION_ERROR = "SESSION_ERROR", e.PARTICIPANT_SYNC = "PARTICIPANT_SYNC", e.CONVERSATION_SYNC = "CONVERSATION_SYNC", e.PARTICIPANT_LIST_UPDATE = "PARTICIPANT_LIST_UPDATE", e.END_CONVERSATION_INITIATED = "END_CONVERSATION_INITIATED", e.CONVERSATION_ENDED = "CONVERSATION_ENDED";
})(y ||= {}), function(e) {
	e.REINITIALIZED = "REINITIALIZED", e.EXPIRED = "EXPIRED";
}(b ||= {});
var pe = new class {
	latestModuleEventHandlerId = 0;
	latestClientEventHandlerId = 0;
	moduleEventHandlers;
	clientEventHandlers;
	defaultNamespace = "default";
	constructor() {
		this.moduleEventHandlers = /* @__PURE__ */ new Map(), this.clientEventHandlers = /* @__PURE__ */ new Map();
	}
	generateModuleHandlerId() {
		return `ModuleEventHandler-${(++this.latestModuleEventHandlerId).toString()}`;
	}
	generateClientHandlerId() {
		return `ClientEventHandler-${(++this.latestClientEventHandlerId).toString()}`;
	}
	getFullEventName(e, t = this.defaultNamespace) {
		return `${t}::${e}`;
	}
	addModuleEventHandler(e, t, n) {
		let r = this.getFullEventName(e, n), i = this.generateModuleHandlerId();
		return this.moduleEventHandlers.has(r) ? this.moduleEventHandlers.get(r).set(i, t) : this.moduleEventHandlers.set(r, (/* @__PURE__ */ new Map()).set(i, t)), i;
	}
	addClientEventHandler(e, t, n) {
		let r = this.getFullEventName(e, n), i = this.generateClientHandlerId();
		return this.clientEventHandlers.has(r) ? this.clientEventHandlers.get(r).set(i, t) : this.clientEventHandlers.set(r, (/* @__PURE__ */ new Map()).set(i, t)), i;
	}
	removeModuleEventHandler(e, t, n) {
		let r = this.getFullEventName(e, n), i = this.moduleEventHandlers.get(r);
		i && (i.delete(t), i.size === 0 && this.moduleEventHandlers.delete(r));
	}
	removeClientEventHandler(e, t, n) {
		let r = this.getFullEventName(e, n), i = this.clientEventHandlers.get(r);
		i && (i.delete(t), i.size === 0 && this.clientEventHandlers.delete(r));
	}
	removeAllModuleHandlers() {
		this.moduleEventHandlers.clear();
	}
	removeAllClientHandlers() {
		for (let e of Array.from(this.clientEventHandlers.keys()).filter(((e) => !e.endsWith(y.INITIALIZED) && !e.endsWith(y.SHUTDOWN)))) this.clientEventHandlers.delete(e);
	}
	async invokeEventHandler(e, t, n) {
		let r = this.getFullEventName(e, n), i = this.moduleEventHandlers.get(r);
		i !== void 0 && i.size > 0 && await Promise.allSettled(Array.from(i?.values() ?? []).map(((e) => e(t))));
		let a = this.clientEventHandlers.get(r);
		if (a !== void 0) for (let e of a.values()) e(t);
	}
}(), me = new class {
	logger = _("EventProcessor");
	async processEvents(e) {
		for (let t of e) switch (t.type) {
			case y.INITIALIZED:
			case y.PARTICIPANT_ADDED:
			case y.PARTICIPANT_DISCONNECTED:
			case y.IDLE_TIMEOUT:
			case y.JWT_STATE_CHANGED:
			case y.CONVERSATION_SYNC:
			case y.SESSION_ERROR:
				pe.invokeEventHandler(t.type, t.event, t.namespace);
				break;
			case y.SHUTDOWN:
				await pe.invokeEventHandler(t.type, t.event, t.namespace);
				break;
			default: this.logger.warn("processEvents()", "Unknown event type", {
				eventType: t.type,
				namespace: t.namespace
			});
		}
	}
}();
function he() {
	return me;
}
var ge = class {
	tokenExpiryWarningTimer;
	tokenExpiryTimer;
	logger = _("JWT");
	ttl;
	tokenExpiryWarnPeriod;
	beforeWarnPeriod;
	jwtProvider;
	token;
	eventProcessor = he();
	constructor(e, t) {
		this.tokenExpiryTimer = new v(g.JwtExpiry, 9e5, this.onTokenExpiryTimeout.bind(this)), this.tokenExpiryWarningTimer = new v(g.JwtWarning, 72e4, this.onTokenExpiryWarningTimeout.bind(this)), this.ttl = 0, this.beforeWarnPeriod = 0, this.tokenExpiryWarnPeriod = 18e4, this.jwtProvider = e, this.token = t, this.startTimers(t);
	}
	stop() {
		this.clear(), this.token = void 0;
	}
	startTimers(e) {
		if (this.ttl = this.extractJwtTTL(e), this.isExpired()) throw this.logger.error("startTimers", u.INVALID_JWT_PROVIDED.message), new s(u.INVALID_JWT_PROVIDED);
		this.beforeWarnPeriod = this.ttl < this.tokenExpiryWarnPeriod ? this.ttl : this.ttl - this.tokenExpiryWarnPeriod, this.setTokenExpiryDuration(this.ttl), this.setTokenExpiryWarningDuration(this.beforeWarnPeriod), this.tokenExpiryTimer.start(), this.tokenExpiryWarningTimer.start();
	}
	clear() {
		this.tokenExpiryTimer.stop(), this.tokenExpiryWarningTimer.stop();
	}
	restart(e) {
		this.clear(), this.startTimers(e);
	}
	getToken() {
		if (this.isExpired()) throw new s(u.TOKEN_EXPIRED);
		return this.token;
	}
	isExpired() {
		return !this.token || this.remainingTime <= 0;
	}
	get remainingTime() {
		return this.token ? this.extractJwtTTL(this.token) : 0;
	}
	extractJwtExpiryTimestamp(e) {
		try {
			let t = (e.startsWith("jwt.") ? e.slice(4) : e).split(".")[1], n = globalThis.atob(t), r = JSON.parse(n).exp, i = /* @__PURE__ */ new Date(0);
			return i.setUTCSeconds(r), i;
		} catch (e) {
			throw this.logger.error("extractJwtExpiryTimestamp()", "Error extracting JWT expiry timestamp", {}, e), e;
		}
	}
	extractJwtTTL(e) {
		return this.extractJwtExpiryTimestamp(e).getTime() - (/* @__PURE__ */ new Date()).getTime();
	}
	setJwtToken(e) {
		let t = this.isExpired();
		this.token = e, this.restart(e), t && this.eventProcessor.processEvents([{
			type: y.JWT_STATE_CHANGED,
			event: {
				eventDate: /* @__PURE__ */ new Date(),
				status: b.REINITIALIZED
			}
		}]), this.logger.debug("setJwtToken()", "JWT token renewed", { wasExpired: t });
	}
	setTokenExpiryWarningDuration(e) {
		this.logger.debug("setTokenExpiryWarningDuration()", "Setting token expiry warning duration", { expiryWarningDuration: e }), this.tokenExpiryWarningTimer.setDuration(e);
	}
	setTokenExpiryDuration(e) {
		this.logger.debug("setTokenExpiryDuration()", "Setting token expiry duration", { expiryDuration: e }), this.tokenExpiryTimer.setDuration(e);
	}
	onTokenExpiryWarningTimeout() {
		this.logger.debug("onTokenExpiryWarningTimeout()", "Token expiry warning timeout occurred. Starting final expiry timer", { tokenExpiryWarnPeriod: this.tokenExpiryWarnPeriod }), this.jwtProvider.onExpireWarning(this.tokenExpiryWarnPeriod);
	}
	onTokenExpiryTimeout() {
		this.logger.warn("onTokenExpiryTimeout()", "Token expired"), this.eventProcessor.processEvents([{
			type: y.JWT_STATE_CHANGED,
			event: {
				eventDate: /* @__PURE__ */ new Date(),
				status: b.EXPIRED
			}
		}]), this.jwtProvider.onExpire();
	}
}, _e = {
	host: "",
	sdkBasePath: "/sdk/digital/chat",
	integrationId: "",
	setConfig(e) {
		this.host = e.host.startsWith("https://") || e.host.startsWith("http://") ? e.host : "https://" + e.host, this.integrationId = e.integrationId;
	}
}, ve = {
	NEW_LOG_LEVEL: "Setting LogLevel to : ",
	SESSION_NOT_FOUND: "Session not found",
	INTEGRATION_NOT_FOUND: "Integration not found",
	EVENT_DISPATCHING_DISABLED: "Event dispatching disabled",
	WEB_CLIENT_TYPE: "web",
	SDK_SHUTDOWN: "Omni SDK is shutting down",
	SDK_NOT_INITIALIZED: "Omni SDK is not initialized",
	PARTICIPANT_ADDED: "Participant added",
	PARTICIPANT_DISCONNECTED: "Participant disconnected",
	PARTICIPANT_UPDATED: "Participant updated",
	PARTICIPANT_REMOVED: "Participant removed",
	ENGAGEMENT_CREATED: "Engagement created",
	SESSION_ERROR: "Session error occurred",
	REGION_TRAILING_FQDN: ".api.avayacloud.com",
	HTTPS: "https://",
	JWT_STATUS_CHANGED: "JWT status changed",
	MAX_CONVERSATIONS_REACHED: "Max conversations limit reached"
}, x;
(function(e) {
	e.MESSAGING = "messaging";
})(x ||= {});
var ye = 70, be = 20, xe = 256, Se = 256, Ce = 20, we = 256, Te = 256, Ee = { shouldBeObject: "ContextParameters should be object of type {key: string (64 max length) -> value: string (256 max length)} with maximum 20 records" }, De = 6e5, Oe = 12e4, ke = 3e5, Ae = 33e5, je = 3e4, Me = 3e5;
function S(e, t, n, r) {
	return {
		participantId: e,
		participantType: Ne(t),
		displayName: r,
		channel: n
	};
}
function Ne(e) {
	switch (e) {
		case "CUSTOMER": return h.CUSTOMER;
		case "AGENT": return h.AGENT;
		case "BOT": return h.BOT;
		case "SYSTEM": return h.SYSTEM;
		case "SUPERVISOR": return h.SUPERVISOR;
	}
}
function Pe(e) {
	return {
		name: e.name,
		enabled: !1,
		properties: e.properties,
		configurations: e.configurations.map(((e) => Pe(e)))
	};
}
var Fe = {
	UUID: /* @__PURE__ */ new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/),
	FQDN: /* @__PURE__ */ new RegExp(/^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?!\d*$)[a-z\d-]+\.?)$/)
}, C = {
	notBlank: (e) => e.trim().length > 0,
	notMoreThan: (e, t) => e.length <= t,
	notLessThan: (e, t) => e.length >= t,
	isOneOf: (e, t) => t.includes(e),
	isBetween: (e, t, n) => e.length >= t && e.length <= n,
	matches: (e, t) => new RegExp(t).test(e),
	isUUID: (e) => Fe.UUID.test(e),
	isFQDN: (e) => Fe.FQDN.test(e),
	isOptionalAnd: {
		notUndefined: (e) => e !== void 0,
		notBlank: (e) => e === void 0 || e.trim().length > 0,
		notMoreThan: (e, t) => e === void 0 || e.length <= t,
		notLessThan: (e, t) => e === void 0 || e.length >= t,
		isBetween: (e, t, n) => e === void 0 || e.length >= t && e.length <= n,
		matches: (e, t) => e === void 0 || new RegExp(t).test(e),
		isOneOf: (e, t) => e === void 0 || t.includes(e),
		isUUID: (e) => e === void 0 || Fe.UUID.test(e),
		isFQDN: (e) => e === void 0 || Fe.FQDN.test(e)
	}
}, Ie = {
	notMoreThan: (e, t) => e <= t,
	notLessThan: (e, t) => e >= t,
	between: (e, t, n) => e >= t && e <= n,
	isOptionalAnd: {
		notMoreThan: (e, t) => e === void 0 || e <= t,
		notLessThan: (e, t) => e === void 0 || e >= t,
		between: (e, t, n) => e === void 0 || e >= t && e <= n
	}
}, w = {
	isString: (e) => typeof e == "string",
	isNumber: (e) => typeof e == "number",
	isFunction: (e) => typeof e == "function",
	isObject: (e) => typeof e == "object" && !Array.isArray(e),
	isNonNullableObject(e) {
		return e !== null && this.isObject(e);
	},
	isRecord(e, t, n, r) {
		if (typeof e != "object" || Array.isArray(e) || t && Object.keys(e).length > t) return !1;
		for (let t in e) if (n && t.length > n || typeof e[t] != "string" || r && e[t].length > r) return !1;
		return !0;
	},
	isNonNullableRecord(e, t, n, r) {
		return e !== null && this.isRecord(e, t, n, r);
	},
	isOptionalAnd: {
		isString: (e) => e === void 0 || typeof e == "string",
		isNumber: (e) => e === void 0 || typeof e == "number",
		isFunction: (e) => e === void 0 || typeof e == "function",
		isObject: (e) => e === void 0 || typeof e == "object" && !Array.isArray(e),
		isRecord: (e, t, n, r) => e === void 0 || w.isRecord(e, t, n, r)
	}
};
function T(e, t, n, r) {
	if (!e) {
		if (n) {
			let e = r ? `${r}::assertConstraint()` : "assertConstraint";
			n.error(e, t);
		} else console.assert(e, c(t));
		throw new s({
			...u.CONSTRAINT_VIOLATION,
			message: c(t)
		});
	}
}
var Le = class e {
	static #e = /* @__PURE__ */ new Map();
	#t;
	constructor(e, t, n, r) {
		this.#t = /* @__PURE__ */ new Map();
	}
	static createInstance(t, n, r, i) {
		let a = i("ConversationParticipantRegistry");
		this.#e.has(t) && a.warn("createInstance()", "Overwriting an existing participant registry for this conversation", {
			sessionId: n,
			conversationId: t
		});
		let o = new e(t, n, r, i);
		return this.#e.set(t, o), a.debug("createInstance()", "Created participant registry", {
			sessionId: n,
			conversationId: t
		}), o;
	}
	static getInstance(e) {
		return this.#e.get(e);
	}
	static hasInstance(e) {
		return this.#e.has(e);
	}
	static clearInstance(e) {
		this.#e.delete(e);
	}
	get currentParticipantView() {
		return Array.from(this.#t.values());
	}
	getParticipant(e) {
		return this.#t.get(e);
	}
	getParticipants() {
		return this.currentParticipantView;
	}
	hasParticipant(e) {
		return this.#t.has(e);
	}
	addParticipant(e) {
		this.#t.set(e.participantId, e);
	}
	updateParticipant(e, t) {
		let n = this.#t.get(e);
		n && (n.displayName = t);
	}
	removeParticipant(e) {
		this.#t.delete(e);
	}
	clearParticipants() {
		this.#t.clear();
	}
}, E, D;
(function(e) {
	e.INITIALIZING = "INITIALIZING", e.ACTIVE = "ACTIVE", e.CLOSING = "CLOSING", e.CLOSED = "CLOSED";
})(E ||= {});
var Re = class {
	#e;
	setDelegate(e) {
		this.#e = e;
	}
	getState() {
		return this.#e ? this.#e.getState() : E.INITIALIZING;
	}
	isOperational() {
		return !!this.#e && this.#e.isOperational();
	}
}, ze = class {
	state;
	logger;
	sessionId;
	conversationId;
	constructor(e, t, n) {
		this.sessionId = e, this.conversationId = t, this.logger = n("ConversationStateController"), this.state = E.ACTIVE;
	}
	get logContext() {
		return {
			sessionId: this.sessionId,
			conversationId: this.conversationId
		};
	}
	getState() {
		return this.state;
	}
	isOperational() {
		return this.state === E.ACTIVE;
	}
	transitionToClosing() {
		if (this.state === E.CLOSING) return void this.logger.warn("transitionToClosing", "Already in CLOSING state", this.logContext);
		let e = this.state;
		this.state = E.CLOSING, this.logger.debug("transitionToClosing", `Transitioned state: ${e} -> ${E.CLOSING}`, {
			...this.logContext,
			fromState: e,
			toState: E.CLOSING
		});
	}
	transitionToClosed() {
		if (this.state === E.CLOSED) return void this.logger.warn("transitionToClosed", "Already in CLOSED state", this.logContext);
		let e = this.state;
		this.state = E.CLOSED, this.logger.debug("transitionToClosed", `Transitioned state: ${e} -> ${E.CLOSED}`, {
			...this.logContext,
			fromState: e,
			toState: E.CLOSED
		});
	}
};
(function(e) {
	e.GET = "GET", e.POST = "POST", e.PUT = "PUT", e.DELETE = "DELETE";
})(D ||= {});
var O = {
	CREATE_SESSION: {
		requestType: D.POST,
		path: (e) => `/v1/messaging-integrations/${e}/sessions`,
		queryParams: { features: "features" }
	},
	TERMINATE_SESSION: {
		requestType: D.DELETE,
		path: (e, t) => `/v1/messaging-integrations/${e}/sessions/${t}`
	},
	GET_SESSION: {
		requestType: D.GET,
		path: (e, t) => `/v1/messaging-integrations/${e}/sessions/${t}`
	},
	CREATE_CONVERSATION: {
		requestType: D.POST,
		path: (e) => `/v1/messaging-integrations/${e}/conversations`
	},
	END_CONVERSATION: {
		requestType: D.POST,
		path: (e, t) => `/v1/messaging-integrations/${e}/conversations/${t}:end`
	}
}, Be = class {
	conversationId;
	rawConversationDetails;
	restController;
	logger;
	handlerIdMap = /* @__PURE__ */ new Map();
	eventDispatcher;
	isSessionValid;
	contextParameters;
	participantRegistry;
	conversationStateController;
	channelRegistry;
	config;
	conversationClosurePromise;
	createdAt;
	constructor(e) {
		let { conversationId: t, conversationDetails: n, restController: r, isSessionValid: i, loggerFactory: a, eventDispatcher: o, contextParameters: s, conversationStatusChecker: c, channelRegistry: l, config: u } = e;
		this.conversationId = t, this.createdAt = new Date(n.createdAt), this.rawConversationDetails = n, this.restController = r, this.logger = a("CoreConversationDelegate"), this.isSessionValid = i, this.eventDispatcher = o, this.registerCallbacks(), this.contextParameters = s, this.conversationStateController = new ze(n.sessionId, t, a), this.config = u, this.channelRegistry = l;
		let d = Le.getInstance(t);
		d ||= (this.logger.warn("constructor()", "Participant registry not found, creating a new one. Omni SDK functionality might be affected.", this.logContext), Le.createInstance(t, n.sessionId, i, a)), this.participantRegistry = d, this.initializeParticipantList(n), this.conversationClosurePromise = this.channelRegistry.allChannelsClosed.then(this.concludeConversation.bind(this)).catch(((e) => {
			this.logger.debug("conversationClosurePromise()", "Conversation closure promise cancelled", this.logContext, e);
		})), c.setDelegate(this.conversationStateController);
	}
	get logContext() {
		return {
			sessionId: this.rawConversationDetails.sessionId,
			conversationId: this.conversationId
		};
	}
	initializeParticipantList(e) {
		if (e.engagements.length > 0) for (let t of e.engagements[0].dialogs[0].participants) {
			let e = t;
			this.updateParticipant(S(e.participantId, e.participantType, x.MESSAGING, e.displayName));
		}
	}
	registerCallbacks() {
		this.handlerIdMap.set(y.PARTICIPANT_ADDED, this.eventDispatcher.addModuleEventHandler(y.PARTICIPANT_ADDED, this.handleParticipantAddition.bind(this), this.conversationId)), this.handlerIdMap.set(y.PARTICIPANT_DISCONNECTED, this.eventDispatcher.addModuleEventHandler(y.PARTICIPANT_DISCONNECTED, this.handleParticipantRemoval.bind(this), this.conversationId)), this.handlerIdMap.set(y.PARTICIPANT_SYNC, this.eventDispatcher.addModuleEventHandler(y.PARTICIPANT_SYNC, this.handleParticipantSync.bind(this), this.conversationId)), this.handlerIdMap.set(y.CONVERSATION_SYNC, this.eventDispatcher.addModuleEventHandler(y.CONVERSATION_SYNC, this.handleConversationSync.bind(this), this.conversationId)), this.handlerIdMap.set(y.PARTICIPANT_LIST_UPDATE, this.eventDispatcher.addModuleEventHandler(y.PARTICIPANT_LIST_UPDATE, this.handleParticipantListUpdate.bind(this), this.conversationId)), this.handlerIdMap.set(y.SHUTDOWN, this.eventDispatcher.addModuleEventHandler(y.SHUTDOWN, this.handleShutdown.bind(this), this.conversationId));
	}
	unregisterCallbacks() {
		for (let [e, t] of this.handlerIdMap.entries()) this.eventDispatcher.removeModuleEventHandler(e, t, this.conversationId);
	}
	assertSessionValidity() {
		if (!this.isSessionValid()) throw new s(u.SDK_NOT_INITIALIZED);
	}
	assertConversationValidity() {
		if (this.conversationStateController.getState() === E.CLOSING) throw new s(u.CONVERSATION_CLOSING);
		if (this.conversationStateController.getState() === E.CLOSED) throw new s(u.CONVERSATION_CLOSED);
	}
	assertBasicValidity() {
		this.assertSessionValidity(), this.assertConversationValidity();
	}
	get state() {
		return this.conversationStateController.getState();
	}
	addParticipantAddedListener(e) {
		return T(w.isFunction(e), "handler should be a function", this.logger, "addParticipantAddedListener()"), this.assertBasicValidity(), this.eventDispatcher.addClientEventHandler(y.PARTICIPANT_ADDED, e, this.conversationId);
	}
	addParticipantDisconnectedListener(e) {
		return T(w.isFunction(e), "handler should be a function", this.logger, "addParticipantDisconnectedListener()"), this.assertBasicValidity(), this.eventDispatcher.addClientEventHandler(y.PARTICIPANT_DISCONNECTED, e, this.conversationId);
	}
	removeParticipantAddedListener(e) {
		this.eventDispatcher.removeClientEventHandler(y.PARTICIPANT_ADDED, e, this.conversationId);
	}
	removeParticipantDisconnectedListener(e) {
		this.eventDispatcher.removeClientEventHandler(y.PARTICIPANT_DISCONNECTED, e, this.conversationId);
	}
	get participants() {
		return this.assertSessionValidity(), JSON.parse(JSON.stringify(this.participantRegistry.getParticipants()));
	}
	handleParticipantAddition(e) {
		let { participant: t } = e;
		if (!t?.channel) throw new s(u.PARTICIPANT_CHANNEL_MISSING, { metadata: { operation: "handleParticipantAddition" } });
		this.updateParticipant(S(t?.participantId, t?.participantType, t?.channel, t?.displayName));
	}
	handleParticipantRemoval(e) {
		let { participant: t } = e;
		if (!t?.channel) throw new s(u.PARTICIPANT_CHANNEL_MISSING, { metadata: { operation: "handleParticipantRemoval" } });
		this.removeParticipant(S(t.participantId, t.participantType, t.channel, t.displayName));
	}
	addParticipant(e) {
		this.participantRegistry.addParticipant(e), this.logger.debug("addParticipant()", ve.PARTICIPANT_ADDED, {
			sessionId: this.rawConversationDetails.sessionId,
			participantId: e.participantId,
			participantType: e.participantType,
			channel: e.channel
		});
	}
	removeParticipant(e) {
		this.participantRegistry.hasParticipant(e.participantId) && (this.participantRegistry.removeParticipant(e.participantId), this.logger.debug("removeParticipant()", ve.PARTICIPANT_REMOVED, {
			sessionId: this.rawConversationDetails.sessionId,
			participantId: e.participantId,
			participantType: e.participantType,
			channel: e.channel
		}));
	}
	async updateParticipant(e) {
		this.participantRegistry.hasParticipant(e.participantId) ? (this.participantRegistry.updateParticipant(e.participantId, e.displayName ?? ""), this.logger.debug("updateParticipant()", ve.PARTICIPANT_UPDATED, {
			sessionId: this.rawConversationDetails.sessionId,
			participantId: e.participantId,
			participantType: e.participantType,
			channel: e.channel
		})) : this.addParticipant(e);
	}
	handleParticipantSync(e) {
		let t = this.computeParticipantViewDelta(this.participantRegistry.currentParticipantView, e.currentParticipants);
		this.logger.debug("handleParticipantSync", "Compared the old view and new view of participants, dispatching respective participant additions and removals.", {
			...this.logContext,
			addedCount: t.added.length,
			removedCount: t.removed.length
		});
		for (let n of t.removed) this.eventDispatcher.invokeEventHandler(y.PARTICIPANT_DISCONNECTED, {
			participant: n,
			conversationId: e.conversationId,
			eventDate: /* @__PURE__ */ new Date(),
			channel: e.channel
		}, this.conversationId);
		for (let n of t.added) this.eventDispatcher.invokeEventHandler(y.PARTICIPANT_ADDED, {
			participant: n,
			conversationId: e.conversationId,
			eventDate: /* @__PURE__ */ new Date(),
			channel: e.channel
		}, this.conversationId);
	}
	computeParticipantViewDelta(e, t) {
		let n = {
			added: [],
			removed: []
		};
		for (let r of t) e.some(((e) => e.participantId === r.participantId)) || n.added.push(r);
		for (let r of e) t.some(((e) => e.participantId === r.participantId)) || n.removed.push(r);
		return n;
	}
	handleConversationSync(e) {
		this.logger.debug("handleConversationSync()", "Received Conversation Sync.", this.logContext);
		let t = e.conversations.find(((e) => e.conversationId === this.conversationId));
		t && (this.rawConversationDetails.engagements = t.engagements);
	}
	handleParticipantListUpdate(e) {
		this.logger.debug("handleParticipantListUpdate()", "Received Participant List Update.", this.logContext);
		for (let t of e.participants) this.updateParticipant(t);
	}
	setContextParameters(e) {
		T(w.isRecord(e, Ce, we, Te), Ee.shouldBeObject, this.logger, "setContextParameters()"), this.assertBasicValidity(), this.contextParameters.reset(e);
	}
	addConversationEndedListener(e) {
		return T(w.isFunction(e), "handler should be a function", this.logger, "addConversationEndedListener()"), this.assertBasicValidity(), this.eventDispatcher.addClientEventHandler(y.CONVERSATION_ENDED, e, this.conversationId);
	}
	removeConversationEndedListener(e) {
		this.eventDispatcher.removeClientEventHandler(y.CONVERSATION_ENDED, e, this.conversationId);
	}
	async requestEndConversation() {
		this.logger.debug("closeConversation()", "Closing conversation", this.logContext);
		try {
			let e = await this.restController.send({
				methodType: O.END_CONVERSATION.requestType,
				url: O.END_CONVERSATION.path(this.config.integrationId, this.conversationId),
				isUrlFull: !1
			});
			e.status !== 204 && this.logger.warn("closeConversation()", `Received unexpected response from server: ${e.status}, ignoring`, {
				...this.logContext,
				httpStatus: e.status
			}), this.logger.debug("closeConversation()", "Conversation closed successfully", this.logContext);
		} catch (e) {
			this.logger.warn("closeConversation()", "Unexpected error occurred while closing conversation, ignoring", this.logContext, e);
		}
	}
	async end() {
		this.assertBasicValidity(), this.logger.debug("endConversation()", "Ending conversation", this.logContext), this.conversationStateController.transitionToClosing(), await this.requestEndConversation(), this.eventDispatcher.invokeEventHandler(y.END_CONVERSATION_INITIATED, {
			conversationId: this.conversationId,
			eventDate: /* @__PURE__ */ new Date(),
			sessionId: this.rawConversationDetails.sessionId
		}, this.conversationId), await this.conversationClosurePromise;
	}
	cleanup() {
		this.logger.debug("cleanup()", "Cleaning up conversation", this.logContext), this.unregisterCallbacks(), this.participantRegistry.clearParticipants(), Le.clearInstance(this.conversationId);
	}
	async concludeConversation() {
		this.logger.debug("concludeConversation()", "Concluding conversation", this.logContext), this.conversationStateController.getState() === E.ACTIVE && this.conversationStateController.transitionToClosing(), this.conversationStateController.transitionToClosed(), this.logger.info("concludeConversation()", "Conversation concluded", this.logContext), this.cleanup(), this.eventDispatcher.invokeEventHandler(y.CONVERSATION_ENDED, {
			conversationId: this.conversationId,
			eventDate: /* @__PURE__ */ new Date(),
			sessionId: this.rawConversationDetails.sessionId
		}, this.conversationId);
	}
	handleShutdown() {
		this.logger.debug("handleShutdown()", "Received shutdown event", this.logContext), this.conversationStateController.transitionToClosed(), this.channelRegistry.handleShutdown(), this.cleanup();
	}
}, Ve = class {
	conversationId;
	#e;
	constructor(e) {
		this.conversationId = e.conversationId, this.#e = new Be(e);
	}
	addParticipantAddedListener(e) {
		return this.#e.addParticipantAddedListener(e);
	}
	addParticipantDisconnectedListener(e) {
		return this.#e.addParticipantDisconnectedListener(e);
	}
	removeParticipantAddedListener(e) {
		this.#e.removeParticipantAddedListener(e);
	}
	removeParticipantDisconnectedListener(e) {
		this.#e.removeParticipantDisconnectedListener(e);
	}
	setContextParameters(e) {
		this.#e.setContextParameters(e);
	}
	get participants() {
		return this.#e.participants;
	}
	get state() {
		return this.#e.state;
	}
	end() {
		return this.#e.end();
	}
	addConversationEndedListener(e) {
		return this.#e.addConversationEndedListener(e);
	}
	removeConversationEndedListener(e) {
		this.#e.removeConversationEndedListener(e);
	}
	get createdAt() {
		return this.#e.createdAt;
	}
};
function He() {
	let e, t;
	return {
		promise: new Promise(((n, r) => {
			e = n, t = r;
		})),
		resolve: e,
		reject: t
	};
}
function k(e) {
	let t = new Uint8Array(e);
	globalThis.crypto.getRandomValues(t);
	let n = "";
	for (let e of t) n += e.toString(16).padStart(2, "0");
	return n;
}
function Ue() {
	if (typeof globalThis.crypto?.randomUUID == "function") return globalThis.crypto.randomUUID();
	let e = k(16), t = (3 & Number.parseInt(e[16], 16) | 8).toString(16);
	return `${e.slice(0, 8)}-${e.slice(8, 12)}-4${e.slice(13, 16)}-${t}${e.slice(17, 20)}-${e.slice(20)}`;
}
var We = class {
	isDone = !1;
	counter = 0;
	promiseWithResolvers = He();
	add(e = 1) {
		if (this.isDone) throw Error("WaitGroup is already completed");
		this.counter += e;
	}
	done() {
		if (this.isDone) throw Error("WaitGroup is already completed");
		this.counter--, this.counter <= 0 && (this.isDone = !0, this.promiseWithResolvers.resolve());
	}
	completionPromise() {
		return this.promiseWithResolvers.promise;
	}
	isCompleted() {
		return this.isDone;
	}
	cancel() {
		if (this.isDone) throw Error("WaitGroup is already completed");
		this.isDone = !0, this.promiseWithResolvers.reject();
	}
}, Ge = "av-log-id", Ke = class {
	#e;
	#t;
	#n = _("RestController");
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async send(e) {
		let { methodType: t, url: n, requestBody: r, requestParameters: i, isUrlFull: a, maxRequestTimeout: o } = e, s, c = n, l = this.#t.getToken(), u = Ue(), d = {
			Authorization: "Bearer " + l,
			[Ge]: u
		};
		r instanceof FormData || t !== D.POST && t !== D.PUT || (d["Content-Type"] = "application/json");
		let f = {
			method: t,
			headers: d
		};
		r && Object.defineProperty(f, "body", {
			value: r,
			writable: !1
		}), a || (s = e.sdkBasePath || this.#e.sdkBasePath, c = this.#e.host + (s ?? "") + c), i && (c += this.appendQueryParams(i));
		let p = new Request(c, f);
		this.#n.debug("send()", "Sending HTTP request", {
			avLogId: u,
			method: t,
			url: c
		});
		let m = performance.now();
		try {
			let e = o ? await this.fetchWithTimeout(o, p) : await fetch(p), n = e.headers.get(Ge);
			return this.#n.debug("send()", "Received HTTP response", {
				avLogId: u,
				responseAvLogId: n,
				method: t,
				url: c,
				httpDurationMs: Math.round(performance.now() - m),
				status: e.status
			}), e;
		} catch (e) {
			throw this.#n.warn("send()", "HTTP request failed", {
				avLogId: u,
				method: t,
				url: c,
				httpDurationMs: Math.round(performance.now() - m)
			}, e), e;
		}
	}
	appendQueryParams(e) {
		let t = "";
		for (let n of e.entries()) t = t + n[0] + "=" + n[1] + "&";
		return "?" + new URLSearchParams(t).toString();
	}
	fetchWithTimeout(e, ...t) {
		let n = new AbortController(), r = setTimeout((() => {
			n.abort();
		}), e);
		return fetch(t[0], {
			...t[1],
			signal: n.signal
		}).finally((() => {
			clearTimeout(r);
		}));
	}
}, A, qe;
(function(e) {
	var t;
	(t = e.DialogStatus ||= {}).PENDING = "PENDING", t.ACTIVE = "ACTIVE", t.TERMINATING = "TERMINATING", t.TERMINATED = "TERMINATED", function(e) {
		e.CUSTOMER = "CUSTOMER", e.AGENT = "AGENT", e.SUPERVISOR = "SUPERVISOR", e.BOT = "BOT", e.SYSTEM = "SYSTEM";
	}(e.ParticipantType ||= {});
})(A ||= {});
var Je = class {
	_parameters;
	constructor(e) {
		this._parameters = e ?? {};
	}
	get parameters() {
		return this._parameters;
	}
	reset(e) {
		this._parameters = e;
	}
	get(e) {
		return this._parameters[e];
	}
	set(e, t) {
		this._parameters[e] = t;
	}
	delete(e) {
		delete this._parameters[e];
	}
	clear() {
		this._parameters = {};
	}
};
function Ye(e) {
	return e.conversations.map(((t) => ({
		sessionId: e.sessionId,
		participantId: e.participantId,
		conversationId: t.conversationId,
		createdAt: t.createdAt,
		engagements: e.engagements.filter(((e) => e.conversationId === t.conversationId)).map(Xe)
	})));
}
function Xe(e) {
	return {
		engagementId: e.engagementId,
		engagementParameters: e.engagementParameters,
		dialogs: e.dialogs.map(Ze)
	};
}
function Ze(e) {
	return {
		dialogId: e.dialogId,
		dialogStatus: Qe(e.dialogStatus),
		createdAt: e.createdAt,
		lastUpdatedAt: e.lastUpdatedAt,
		participants: e.participants.map(((e) => ({
			participantId: e.participantId,
			participantType: $e(e.participantType),
			displayName: e.displayName
		})))
	};
}
function Qe(e) {
	switch (e) {
		case "PENDING": return A.DialogStatus.PENDING;
		case "ACTIVE": return A.DialogStatus.ACTIVE;
		case "TERMINATING": return A.DialogStatus.TERMINATING;
		case "TERMINATED": return A.DialogStatus.TERMINATED;
	}
}
function $e(e) {
	switch (e) {
		case "CUSTOMER": return A.ParticipantType.CUSTOMER;
		case "AGENT": return A.ParticipantType.AGENT;
		case "SUPERVISOR": return A.ParticipantType.SUPERVISOR;
		case "BOT": return A.ParticipantType.BOT;
		case "SYSTEM": return A.ParticipantType.SYSTEM;
	}
}
function et(e) {
	return {
		name: e.name,
		enabled: e.enabled ?? !1,
		properties: e.properties ? tt(e.properties) : {},
		configurations: e.configurations ? e.configurations.map(et) : []
	};
}
function tt(e) {
	let t = {};
	for (let n in e) e[n] && (t[n] = e[n]);
	return t;
}
var nt = class {
	sessionId;
	currentSessionDetails;
	sessionParameters = {};
	sessionLatch;
	conversations = /* @__PURE__ */ new Map();
	participantId = void 0;
	sessionPoller;
	eventProcessor;
	logger = _("Session");
	sessionPollingManager;
	features;
	endConversationHandlerIds;
	eventDispatcher;
	constructor(e, t, n, r, i, a, o, s) {
		this.sessionId = e.sessionId, this.currentSessionDetails = e, this.sessionParameters = e.sessionParameters, this.sessionLatch = n, this.participantId = e.participantId, this.eventProcessor = r, this.sessionPoller = i, this.features = o, this.eventDispatcher = s, this.sessionPollingManager = a, this.endConversationHandlerIds = /* @__PURE__ */ new Map();
		for (let e of t) this.addConversation(e);
		this.sessionPoller.onPoll(this.handleSessionPollResponse.bind(this)), this.sessionPoller.onSessionError(this.handleSessionError.bind(this));
	}
	handleSessionPollResponse(e) {
		if (this.sessionLatch.isLatched()) {
			this.currentSessionDetails = e;
			let t = Ye(e);
			this.logger.debug("handleSessionPollResponse()", "Dispatching conversation sync event", {
				sessionId: this.sessionId,
				conversationCount: t.length
			}), this.eventProcessor.processEvents([{
				type: y.CONVERSATION_SYNC,
				event: { conversations: t }
			}]);
		}
	}
	handleEndConversation(e) {
		if (this.sessionLatch.isLatched()) {
			this.logger.debug("handleEndConversation()", "Removing conversation", {
				sessionId: this.sessionId,
				conversationId: e.conversationId
			}), this.conversations.delete(e.conversationId);
			let t = this.endConversationHandlerIds.get(e.conversationId);
			t && (this.eventDispatcher.removeModuleEventHandler(y.CONVERSATION_ENDED, t, e.conversationId), this.endConversationHandlerIds.delete(e.conversationId));
		}
	}
	handleSessionError() {
		this.sessionLatch.isLatched() && (this.logger.warn("handleSessionError()", "Session poller reported a session error, dispatching event", { sessionId: this.sessionId }), this.sessionPoller.stop(), this.eventProcessor.processEvents([{
			type: y.SESSION_ERROR,
			event: {
				sessionId: this.sessionId,
				eventDate: /* @__PURE__ */ new Date(),
				errorReason: m.SESSION_NOT_FOUND
			}
		}]));
	}
	cleanup() {
		this.sessionPoller.stop(), this.sessionPoller.removeListeners(), this.conversations.clear();
		for (let [e, t] of this.endConversationHandlerIds.entries()) this.eventDispatcher.removeModuleEventHandler(y.CONVERSATION_ENDED, t, e);
	}
	getSessionId() {
		return this.sessionId;
	}
	release() {
		this.sessionLatch.release();
	}
	isLatched() {
		return this.sessionLatch.isLatched();
	}
	getConversations() {
		return Array.from(this.conversations.values());
	}
	getConversationById(e) {
		return this.conversations.get(e);
	}
	hasConversation(e) {
		return this.logger.debug("hasConversation()", `Checking if conversation (${e}) exists`, {
			sessionId: this.sessionId,
			conversationId: e
		}), this.conversations.has(e);
	}
	addConversation(e) {
		this.logger.debug("addConversation()", `Adding conversation (${e.conversationId})`, {
			sessionId: this.sessionId,
			conversationId: e.conversationId
		}), this.conversations.set(e.conversationId, e), this.endConversationHandlerIds.set(e.conversationId, this.eventDispatcher.addModuleEventHandler(y.CONVERSATION_ENDED, this.handleEndConversation.bind(this), e.conversationId));
	}
	removeConversation(e) {
		this.logger.debug("removeConversation()", `Removing conversation (${e})`, {
			sessionId: this.sessionId,
			conversationId: e
		}), this.conversations.delete(e);
	}
	removeAllConversations() {
		this.logger.debug("removeAllConversations()", "Removing all conversations", {
			sessionId: this.sessionId,
			conversationCount: this.conversations.size
		}), this.conversations.clear();
	}
	getParticipantId() {
		return this.participantId;
	}
	getSessionParameters() {
		return this.sessionParameters;
	}
	getSessionPollingManager() {
		return this.sessionPollingManager;
	}
	getRawSessionDetails() {
		return this.currentSessionDetails;
	}
	getFeatures() {
		return this.features;
	}
	getLatchChecker() {
		return this.sessionLatch.isLatched;
	}
};
(function(e) {
	e.Idle = "SessionIdleTimer", e.Grace = "SessionGraceTimer";
})(qe ||= {});
var rt = class {
	idleTimer;
	graceTimer;
	onIdleTimeoutCallback;
	onGraceTimeoutCallback;
	logger = _("InactivityTimerController");
	continuousActivityCount = 0;
	constructor(e, t) {
		this.idleTimer = new v(qe.Idle, De, this.onIdleTimeout.bind(this)), this.graceTimer = new v(qe.Grace, Oe, this.onGraceTimeout.bind(this)), this.onIdleTimeoutCallback = e, this.onGraceTimeoutCallback = t;
	}
	setIdleTimeoutDuration(e) {
		this.logger.debug("setIdleTimeoutDuration", "Setting idle timeout duration", { idleTimeout: e }), this.idleTimer.setDuration(e);
	}
	setGraceTimeoutDuration(e) {
		this.logger.debug("setGraceTimeoutDuration", "Setting grace timeout duration", { graceTimeout: e }), this.graceTimer.setDuration(e);
	}
	startIdleTimer() {
		this.stopAllTimers(), this.idleTimer.start();
	}
	startGraceTimer() {
		this.stopCurrentTimer(), this.graceTimer.start();
	}
	get currentTimer() {
		return this.idleTimer.isRunning ? qe.Idle : this.graceTimer.isRunning ? qe.Grace : void 0;
	}
	reportIntermittentActivity() {
		this.continuousActivityCount > 0 ? this.logger.debug("reportIntermittentActivity", `Ignoring the request as continuous ${this.continuousActivityCount > 1 ? "activities are" : "activity is"} ongoing.`, { continuousActivityCount: this.continuousActivityCount }) : (this.logger.debug("reportIntermittentActivity", "Resetting inactivity timers."), this.startIdleTimer());
	}
	beginContinuousActivity() {
		this.continuousActivityCount === 0 && this.stopCurrentTimer(), this.continuousActivityCount++, this.logger.debug("beginContinuousActivity", `New continuous activity started, number of ongoing continuous activities: ${this.continuousActivityCount}`, { continuousActivityCount: this.continuousActivityCount });
	}
	endContinuousActivity() {
		this.continuousActivityCount <= 0 ? this.logger.warn("endContinuousActivity", "No continuous activity is ongoing. Ignoring the call.", { continuousActivityCount: this.continuousActivityCount }) : (this.continuousActivityCount--, this.continuousActivityCount === 0 && this.startIdleTimer(), this.logger.debug("endContinuousActivity", `Continuous activity ended, number of ongoing continuous activities: ${this.continuousActivityCount}`, { continuousActivityCount: this.continuousActivityCount }));
	}
	stopAllTimers() {
		this.idleTimer.isRunning && this.idleTimer.stop(), this.graceTimer.isRunning && this.graceTimer.stop();
	}
	stopCurrentTimer() {
		this.currentTimer === qe.Idle ? this.idleTimer.stop() : this.currentTimer === qe.Grace && this.graceTimer.stop();
	}
	onIdleTimeout() {
		this.logger.debug("onIdleTimeout", "Idle timeout occurred. Starting grace timer.", { graceDuration: this.graceTimer.getDuration() }), this.startGraceTimer(), this.onIdleTimeoutCallback(this.graceTimer.getDuration());
	}
	onGraceTimeout() {
		this.logger.debug("onGraceTimeout", "Grace timeout occurred."), this.onGraceTimeoutCallback();
	}
}, it = class {
	sessionId;
	frequency = 6e4;
	fallbackFrequency = 6e5;
	isPollingAllowed;
	restController;
	config;
	logger;
	pollIntervalHandle;
	maxConsecutiveFailures = 3;
	fallbackMode = !1;
	notifyPollResponse;
	notifySessionError;
	constructor(e, t, n) {
		this.isPollingAllowed = !1, this.restController = t, this.config = n, this.sessionId = e, this.logger = _("SessionPoller");
	}
	async check() {
		if (this.isPollingAllowed) {
			this.logger.debug("check()", "Checking for session updates.", { sessionId: this.sessionId });
			try {
				let e = await this.getSessionWithRetry();
				this.fallbackMode && this.deactivateFallbackMode(), this.notifyPollResponse?.(e);
			} catch (e) {
				this.logger.warn("check()", "Unexpected error while trying to fetch session details.", {
					integrationId: this.config.integrationId,
					sessionId: this.sessionId
				}, e), d(e) && e.detail === u.SESSION_POLLING_MAX_RETRIES_EXCEEDED.detail ? this.activateFallbackMode() : d(e) && e.detail === u.SESSION_NOT_FOUND.detail && this.notifySessionError?.();
			}
		}
	}
	async fetchSession() {
		let e = await this.restController.send({
			methodType: O.GET_SESSION.requestType,
			url: O.GET_SESSION.path(this.config.integrationId, this.sessionId),
			isUrlFull: !1
		});
		if (!e.ok) throw e.status === 404 && (await e.json()).detail === ve.SESSION_NOT_FOUND ? new s(u.SESSION_NOT_FOUND) : new s(u.GET_SESSION_UNEXPECTED_STATUS, { metadata: { httpStatus: e.status } });
		return e.json();
	}
	async getSessionWithRetry() {
		let e, t = 0;
		for (; t < this.maxConsecutiveFailures;) try {
			e = await this.fetchSession();
			break;
		} catch (e) {
			if (this.logger.warn("getSessionWithRetry()", "Failed to fetch session details.", {
				integrationId: this.config.integrationId,
				sessionId: this.sessionId,
				consecutiveFailures: t,
				maxConsecutiveFailures: this.maxConsecutiveFailures
			}, e), d(e) && e.detail === u.SESSION_NOT_FOUND.detail) throw e;
			t++;
		}
		if (e === void 0) throw new s(u.SESSION_POLLING_MAX_RETRIES_EXCEEDED);
		return e;
	}
	enableFallbackMode() {
		this.logger.debug("activateFallbackMode()", "Activating fallback mode.", { sessionId: this.sessionId }), this.fallbackMode = !0;
	}
	disableFallbackMode() {
		this.logger.debug("deactivateFallbackMode()", "Deactivating fallback mode.", { sessionId: this.sessionId }), this.fallbackMode = !1;
	}
	activateFallbackMode() {
		this.fallbackMode ? this.logger.debug("activateFallbackMode()", "Fallback mode is already active.", { sessionId: this.sessionId }) : (this.stop(), this.enableFallbackMode(), this.start());
	}
	deactivateFallbackMode() {
		this.fallbackMode ? (this.stop(), this.disableFallbackMode(), this.start()) : this.logger.debug("deactivateFallbackMode()", "Fallback mode is already inactive.", { sessionId: this.sessionId });
	}
	start() {
		this.isPollingAllowed ? this.logger.debug("start()", "Session poller is already running.", { sessionId: this.sessionId }) : (this.logger.debug("start()", "Starting session poller.", {
			sessionId: this.sessionId,
			frequency: this.fallbackMode ? this.fallbackFrequency : this.frequency,
			fallbackMode: this.fallbackMode
		}), this.isPollingAllowed = !0, this.pollIntervalHandle = setInterval(this.check.bind(this), this.fallbackMode ? this.fallbackFrequency : this.frequency));
	}
	stop() {
		this.isPollingAllowed ? (this.logger.debug("stop()", "Stopping session poller.", { sessionId: this.sessionId }), this.isPollingAllowed = !1, this.pollIntervalHandle &&= (clearInterval(this.pollIntervalHandle), void 0)) : this.logger.debug("stop()", "Session poller is already stopped.", { sessionId: this.sessionId });
	}
	onPoll(e) {
		this.notifyPollResponse = e;
	}
	onSessionError(e) {
		this.notifySessionError = e;
	}
	removeListeners() {
		this.notifyPollResponse = void 0, this.notifySessionError = void 0;
	}
}, at = class {
	sessionId;
	eventDispatcher;
	sessionPollingControls;
	checkSessionLatch;
	moduleSubscriptionCount = 0;
	logger = _("SessionPollingManager");
	constructor(e, t, n, r) {
		this.sessionId = e, this.eventDispatcher = t, this.sessionPollingControls = n, this.checkSessionLatch = r;
	}
	subscribe(e) {
		if (this.checkSessionLatch()) {
			let t = this.eventDispatcher.addModuleEventHandler(y.CONVERSATION_SYNC, e);
			return this.moduleSubscriptionCount === 0 && (this.logger.debug("subscribe()", "A module has started listening, starting session poller.", { sessionId: this.sessionId }), this.sessionPollingControls.start()), this.moduleSubscriptionCount++, t;
		}
		this.logger.debug("subscribe()", "Ignoring the call as session is invalid", { sessionId: this.sessionId });
	}
	unsubscribe(e) {
		this.checkSessionLatch() ? (this.eventDispatcher.removeModuleEventHandler(y.CONVERSATION_SYNC, e), this.moduleSubscriptionCount--, this.moduleSubscriptionCount === 0 && (this.logger.debug("unsubscribe()", "No modules are listening, stopping the session poller.", { sessionId: this.sessionId }), this.sessionPollingControls.stop())) : this.logger.debug("unsubscribe()", "Ignoring the call as session is invalid", { sessionId: this.sessionId });
	}
}, ot = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n;
	#r;
	constructor(e, t, n) {
		this.#n = e, this.#t = n("OmniSdkFeatures"), this.#r = n;
		for (let r of t) this.#e.set(r.name, new st(r, e, n));
		this.#t.info("constructor", "Parsed session features", {
			sessionId: this.#n,
			features: t.map(((e) => ({
				name: e.name,
				enabled: e.enabled
			})))
		});
	}
	hasFeature(e) {
		return this.#e.has(e);
	}
	getFeature(e) {
		return this.#e.get(e);
	}
	getFeatureOrDefault(e, t) {
		let n = this.getFeature(e);
		return n || (n = new st(Pe(t), this.#n, this.#r), this.#e.set(e, n)), n;
	}
	getAllFeatures() {
		return Array.from(this.#e.values());
	}
	forceDisableAll() {
		this.#t.debug("forceDisableAll", "Disabling all features", { sessionId: this.#n });
		for (let e of this.#e.values()) e.forceDisable();
	}
}, st = class e {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	constructor(t, n, r) {
		this.#e = t.name, this.#n = t.enabled, this.#r = t.properties, this.#i = /* @__PURE__ */ new Map(), this.#t = n, this.#a = r, this.#o = r("OmniSdkFeature");
		for (let i of t.configurations) this.#i.set(i.name, new e(i, n, r));
	}
	get name() {
		return this.#e;
	}
	get isEnabled() {
		return this.#n;
	}
	hasSubFeature(e) {
		return this.#i.has(e);
	}
	hasSubFeatures() {
		return this.#i.size > 0;
	}
	getSubFeature(e) {
		return this.#i.get(e);
	}
	getSubFeatureOrDefault(t, n) {
		let r = this.getSubFeature(t);
		return r ||= new e(Pe(n), this.#t, this.#a), r;
	}
	getAllSubFeatures() {
		return Array.from(this.#i.values());
	}
	hasProperty(e) {
		return Object.hasOwn(this.#r, e);
	}
	getProperty(e) {
		return this.getRawProperty(e);
	}
	getAllProperties() {
		return this.getAllRawProperties();
	}
	getRawProperty(e) {
		return this.#r[e];
	}
	getRawPropertyOrDefault(e, t) {
		return this.getRawProperty(e) || (this.#r[e] = t, t);
	}
	getAllRawProperties() {
		return this.#r;
	}
	getParsedProperty(e, t) {
		let n = this.getRawProperty(e);
		if (n) return t(n);
	}
	getParsedPropertyOrDefault(e, t, n) {
		return this.getParsedProperty(e, n) || (this.#r[e] = t, n(t));
	}
	forceDisable() {
		this.#n = !1, this.#o.debug("forceDisable", `Disabled feature: ${this.#e}`, {
			sessionId: this.#t,
			featureName: this.#e
		});
		for (let e of this.#i.values()) e.forceDisable();
	}
}, ct = { areConversationsClosable: (e) => e.getFeatureOrDefault("conversations", {
	name: "conversations",
	properties: { closable: "true" },
	configurations: []
}).getRawPropertyOrDefault("closable", "false") === "true" }, lt = class {
	#e;
	constructor(e) {
		this.#e = {};
		for (let t of e) this.#e[t.name] = new ut(t);
	}
	hasFeature(e) {
		return Object.hasOwn(this.#e, e);
	}
	getFeature(e) {
		return this.#e[e];
	}
	getAllFeatures() {
		return Object.values(this.#e);
	}
}, ut = class e {
	#e;
	#t;
	#n;
	#r;
	constructor(t) {
		this.#e = t.name, this.#t = t.enabled, this.#n = t.properties, this.#r = {};
		for (let n of t.configurations) this.#r[n.name] = new e(n);
	}
	get name() {
		return this.#e;
	}
	get isEnabled() {
		return this.#t;
	}
	hasProperty(e) {
		return Object.hasOwn(this.#n, e);
	}
	getProperty(e) {
		return this.#n[e];
	}
	getAllProperties() {
		return this.#n;
	}
	hasSubFeature(e) {
		return Object.hasOwn(this.#r, e);
	}
	getSubFeature(e) {
		return this.#r[e];
	}
	getAllSubFeatures() {
		return Object.values(this.#r);
	}
}, dt = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	constructor(e, t, n, r) {
		this.#e = e, this.#t = t, this.#n = n, this.#i = r("ConversationChannelsRegistry"), this.#r = /* @__PURE__ */ new Map(), this.#a = new We();
	}
	get #o() {
		return {
			sessionId: this.#e,
			conversationId: this.#t
		};
	}
	get allChannelsClosed() {
		return this.#n ? this.#a.completionPromise() : Promise.reject(/* @__PURE__ */ Error("Conversation is not closable"));
	}
	registerConversationChannel(e) {
		this.#r.has(e) ? this.#i.warn("registerChannel", `Channel ${e} is already registered`, {
			...this.#o,
			channelName: e
		}) : (this.#r.set(e, !1), this.#a.add(), this.#i.debug("registerChannel", `Registered Conversation Channel: ${e}`, {
			...this.#o,
			channelName: e,
			registeredChannelCount: this.#r.size
		}));
	}
	notifyConversationChannelClosure(e) {
		this.#r.has(e) ? this.#r.get(e) ? this.#i.warn("notifyChannelClosed", `Channel ${e} is already closed, ignoring`, {
			...this.#o,
			channelName: e
		}) : (this.#r.set(e, !0), this.#a.done(), this.#i.debug("notifyChannelClosed", `Conversation Channel: ${e} closed`, {
			...this.#o,
			channelName: e
		})) : this.#i.warn("notifyChannelClosed", `Channel ${e} is not registered, ignoring`, {
			...this.#o,
			channelName: e
		});
	}
	handleShutdown() {
		try {
			this.#a.cancel();
			for (let [e, t] of this.#r.entries()) t || this.#r.set(e, !0);
		} catch (e) {
			this.#i.error("handleShutdown", "Error during SDK shutdown", this.#o, e);
		} finally {
			this.#i.debug("handleShutdown", "Handled Omni SDK shutdown", {
				...this.#o,
				channelCount: this.#r.size
			});
		}
	}
}, j = class {
	static #e;
	static #t;
	static #n;
	static #r = he();
	static #i = pe;
	static #a = _("AvayaInfinityOmniSdk");
	static #o = !1;
	static #s = new rt(((e) => {
		this.#r.processEvents([{
			type: y.IDLE_TIMEOUT,
			event: { gracePeriod: e }
		}]);
	}), (() => {
		this.shutdown(p.USER_INACTIVE);
	}));
	static version() {
		return "1.0.5";
	}
	static #c(e) {
		T(w.isNonNullableObject(e), "initParams should be an object", this.#a, "validateInitParams()"), this.#l(e.logLevel), T(e.integrationId !== void 0, "integrationId is required", this.#a, "validateInitParams()"), T(w.isString(e.integrationId), "integrationId should be a string", this.#a, "validateInitParams()"), T(e.host !== void 0, "host is required", this.#a, "validateInitParams()"), T(w.isString(e.host), "host should be a string", this.#a, "validateInitParams()"), T(C.notBlank(e.host), "host should not be blank", this.#a, "validateInitParams()"), T(e.token !== void 0, "token is required", this.#a, "validateInitParams()"), T(w.isString(e.token), "token should be a string", this.#a, "validateInitParams()"), T(C.notBlank(e.token), "token should not be blank", this.#a, "validateInitParams()"), T(w.isOptionalAnd.isNumber(e.idleTimeoutDuration), "idleTimeoutDuration should be a number", this.#a, "validateInitParams()"), T(Ie.isOptionalAnd.between(e.idleTimeoutDuration, ke, Ae), `idleTimeoutDuration should be between ${ke} and ${Ae}`, this.#a, "validateInitParams()"), T(w.isOptionalAnd.isNumber(e.idleShutdownGraceTimeoutDuration), "idleShutdownGraceTimeoutDuration should be a number", this.#a, "validateInitParams()"), T(Ie.isOptionalAnd.between(e.idleShutdownGraceTimeoutDuration, je, Me), `idleShutdownGraceTimeoutDuration should be between ${je} and ${Me}`, this.#a, "validateInitParams()"), T(e.jwtProvider !== void 0, "JWTProvider is required", this.#a, "validateInitParams()"), T(w.isObject(e.jwtProvider), "JWTProvider should be an object", this.#a, "validateInitParams()"), this.#u(e.displayName, e.sessionParameters);
	}
	static #l(e) {
		if (e && !Object.values(f).includes(e)) throw new s(u.INVALID_LOG_LEVEL);
	}
	static setLogLevel(e) {
		this.#l(e), fe.setLevel(e);
	}
	static getRawLogs() {
		return ue();
	}
	static exportLogs() {
		return function(e) {
			let t = ue(), n = {
				sdkVersion: e,
				exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
				entryCount: t.length,
				entries: t
			};
			return new Blob([JSON.stringify(n, void 0, 2)], { type: "application/json" });
		}(this.version());
	}
	static async init(e, t = Ve) {
		if (this.#o) throw new s(u.SDK_BUSY);
		if (this.#n && this.#n.isLatched()) throw new s(u.SESSION_INITIALIZED_ALREADY);
		let n, r;
		de(), this.#a.info("init()", "Session initialization initiated", { integrationId: e.integrationId });
		try {
			this.#o = !0, this.#c(e), fe.setLevel(e.logLevel ?? f.WARN), _e.setConfig(e), e.idleTimeoutDuration && this.#s.setIdleTimeoutDuration(e.idleTimeoutDuration), e.idleShutdownGraceTimeoutDuration && this.#s.setGraceTimeoutDuration(e.idleShutdownGraceTimeoutDuration), this.#t = new ge(e.jwtProvider, e.token), this.#e = new Ke(_e, this.#t);
			let i = await this.#e.send({
				methodType: O.CREATE_SESSION.requestType,
				url: O.CREATE_SESSION.path(_e.integrationId),
				requestBody: JSON.stringify({
					displayName: e.displayName,
					sessionParameters: e.sessionParameters,
					clientType: ve.WEB_CLIENT_TYPE
				}),
				isUrlFull: !1,
				requestParameters: (/* @__PURE__ */ new Map()).set(O.CREATE_SESSION.queryParams.features, "true")
			});
			if (r = i.status, !i.ok) throw new s(u.SDK_INIT_FAILED);
			let a = await i.json();
			n = a.sessionId;
			let o = function() {
				let e = !0;
				return {
					release: () => {
						e = !1;
					},
					isLatched: () => e
				};
			}(), c = new it(a.sessionId, this.#e, _e), l = new at(a.sessionId, this.#i, c, (() => o.isLatched())), d;
			try {
				d = Array.isArray(a.features) ? a.features.map(et) : [];
			} catch (e) {
				this.#a.warn("init()", "Unexpected error occurred while transforming feature list, falling back to empty list", { sessionId: a.sessionId }, e), d = [];
			}
			let p = new ot(a.sessionId, d, _), m = new lt(d), h = Ye(a).map(((e) => new t({
				conversationId: e.conversationId,
				conversationDetails: e,
				conversationStatusChecker: new Re(),
				restController: this.#e,
				jwt: this.#t,
				config: _e,
				isSessionValid: o.isLatched,
				loggerFactory: _,
				eventDispatcher: this.#i,
				inactivityTimerController: this.#s,
				contextParameters: new Je(),
				sessionPollingManager: l,
				features: p,
				participantRegistry: Le.createInstance(e.conversationId, e.sessionId, o.isLatched, _),
				channelRegistry: new dt(a.sessionId, e.conversationId, ct.areConversationsClosable(p), _)
			})));
			this.#n = new nt(a, h, o, this.#r, c, l, p, pe);
			let g = {
				displayName: a.displayName,
				sessionParameters: a.sessionParameters,
				conversations: h,
				participantId: this.#n.getParticipantId(),
				featureConfigs: m
			};
			return this.#s.startIdleTimer(), this.#i.addModuleEventHandler(y.SESSION_ERROR, this.#d.bind(this)), this.#r.processEvents([{
				type: y.INITIALIZED,
				event: g
			}]), this.#a.info("init()", "Session initialized", {
				sessionId: n,
				conversationCount: h.length
			}), g;
		} catch (t) {
			throw t instanceof Error && this.#a.error("init()", "Failed to initialize the session", {
				integrationId: e.integrationId,
				sessionId: n,
				httpStatus: r
			}, t), t;
		} finally {
			this.#o = !1;
		}
	}
	static getDefaultConversation() {
		if (this.#o) throw new s(u.SDK_BUSY);
		if (!this.#n || !this.#n.isLatched()) throw new s(u.SDK_NOT_INITIALIZED);
		return this.#n.getConversations()[0];
	}
	static async createConversation(e = Ve) {
		if (this.#o) throw new s(u.SDK_BUSY);
		if (!this.#n || !this.#n.isLatched()) throw new s(u.SDK_NOT_INITIALIZED);
		let t = ct.areConversationsClosable(this.#n.getFeatures());
		if (!t) throw new s(u.CONVERSATIONS_NOT_CLOSABLE);
		let n;
		try {
			let r = await this.#e.send({
				methodType: O.CREATE_CONVERSATION.requestType,
				url: O.CREATE_CONVERSATION.path(_e.integrationId),
				requestBody: JSON.stringify({ sessionId: this.#n.getSessionId() }),
				isUrlFull: !1
			});
			if (n = r.status, !r.ok) {
				let e = await r.json();
				throw r.status === 400 && e.detail === ve.MAX_CONVERSATIONS_REACHED ? new s(u.MAX_CONVERSATIONS_REACHED) : new s(u.CREATE_CONVERSATION_FAILED);
			}
			let i = await r.json(), a = {
				conversationId: i.conversationId,
				participantId: this.#n.getParticipantId(),
				createdAt: i.createdAt,
				sessionId: this.#n.getSessionId(),
				engagements: []
			}, o = new e({
				conversationId: a.conversationId,
				conversationDetails: a,
				conversationStatusChecker: new Re(),
				restController: this.#e,
				jwt: this.#t,
				config: _e,
				isSessionValid: this.#n.getLatchChecker(),
				loggerFactory: _,
				eventDispatcher: this.#i,
				inactivityTimerController: this.#s,
				contextParameters: new Je({}),
				sessionPollingManager: this.#n.getSessionPollingManager(),
				features: this.#n.getFeatures(),
				participantRegistry: Le.createInstance(a.conversationId, a.sessionId, this.#n.getLatchChecker(), _),
				channelRegistry: new dt(this.#n.getSessionId(), a.conversationId, t, _)
			});
			return this.#n.addConversation(o), this.#a.info("createConversation()", "Created new conversation", {
				sessionId: this.#n.getSessionId(),
				conversationId: a.conversationId
			}), o;
		} catch (e) {
			throw this.#a.error("createConversation()", "Error occurred while creating conversation.", {
				sessionId: this.#n.getSessionId(),
				httpStatus: n
			}, e), e;
		}
	}
	static setJwt(e) {
		if (this.#o) throw new s(u.SDK_BUSY);
		if (!this.#n || !this.#n.isLatched()) throw new s(u.SDK_NOT_INITIALIZED);
		this.#t.setJwtToken(e);
	}
	static async shutdown(e) {
		if (this.#o) throw new s(u.SDK_BUSY);
		if (!this.#n || !this.#n.isLatched()) throw new s(u.SDK_NOT_INITIALIZED);
		this.#a.info("shutdown()", "Session shutdown initiated", {
			sessionId: this.#n.getSessionId(),
			reason: e
		});
		try {
			this.#o = !0, this.#n.cleanup(), e !== p.USER_INACTIVE && this.#s.stopAllTimers();
			let t = {
				sessionId: this.#n.getSessionId(),
				eventDate: /* @__PURE__ */ new Date(),
				reason: e
			}, n;
			e && (n = /* @__PURE__ */ new Map(), n.set("reason", e));
			let r = await this.#e.send({
				methodType: O.TERMINATE_SESSION.requestType,
				url: O.TERMINATE_SESSION.path(_e.integrationId, this.#n.getSessionId()),
				isUrlFull: !1,
				requestParameters: n
			});
			r.status !== 204 && this.#a.warn("shutdown()", "Failed to terminate the session", {
				sessionId: this.#n.getSessionId(),
				httpStatus: r.status
			}), await this.#r.processEvents([{
				type: y.SHUTDOWN,
				event: t
			}]), this.#t.stop(), this.#i.removeAllClientHandlers(), this.#i.removeAllModuleHandlers(), this.#a.info("shutdown()", "Session terminated", {
				sessionId: this.#n.getSessionId(),
				reason: e
			});
		} catch (e) {
			this.#a.error("shutdown()", "Failed to shutdown", { sessionId: this.#n?.getSessionId() }, e);
		} finally {
			this.#n.release(), this.#o = !1, de();
		}
	}
	static resetIdleTimeout() {
		if (this.#o) throw new s(u.SDK_BUSY);
		if (!this.#n || !this.#n.isLatched()) throw new s(u.SDK_NOT_INITIALIZED);
		this.#a.debug("resetIdleTimeout()", "Activity reported by client", { sessionId: this.#n.getSessionId() }), this.#s.reportIntermittentActivity();
	}
	static addSdkInitializedListener(e) {
		if (this.#n?.isLatched()) throw this.#a.error("addSdkInitializedListener()", u.SESSION_INITIALIZED_ALREADY.message, { sessionId: this.#n?.getSessionId() }), new s(u.SESSION_INITIALIZED_ALREADY);
		return T(w.isFunction(e), "eventHandler should be a function", this.#a, "addSdkInitializedListener()"), this.#i.addClientEventHandler(y.INITIALIZED, e);
	}
	static removeSdkInitializedListener(e) {
		this.#i.removeClientEventHandler(y.INITIALIZED, e);
	}
	static addSdkShutdownListener(e) {
		return T(w.isFunction(e), "eventHandler should be a function", this.#a, "addSdkShutdownListener()"), this.#i.addClientEventHandler(y.SHUTDOWN, e);
	}
	static removeSdkShutdownListener(e) {
		this.#i.removeClientEventHandler(y.SHUTDOWN, e);
	}
	static addIdleTimeOutInvokedListener(e) {
		return T(w.isFunction(e), "eventHandler should be a function", this.#a, "addIdleTimeOutInvokedListener()"), this.#i.addClientEventHandler(y.IDLE_TIMEOUT, e);
	}
	static removeIdleTimeOutInvokedListener(e) {
		this.#i.removeClientEventHandler(y.IDLE_TIMEOUT, e);
	}
	static #u(e, t) {
		T(C.isOptionalAnd.notMoreThan(e, ye), "Invalid displayName", this.#a, "validateSessionParams()"), T(w.isOptionalAnd.isRecord(t, be, xe, Se), "Invalid session parameters", this.#a, "validateSessionParams()");
	}
	static #d(e) {
		this.#a.warn("handleSessionErrorEvent()", ve.SESSION_ERROR, {
			sessionId: e.sessionId,
			eventDate: e.eventDate,
			errorReason: e.errorReason
		}), e.errorReason === m.SESSION_NOT_FOUND && this.shutdown(p.UNKNOWN);
	}
}, M = {
	INVALID_MESSAGE_ELEMENT_TYPE: "OSE_MSG_INVALID_MESSAGE_ELEMENT_TYPE",
	SEND_MESSAGE_FAILED: "OSE_MSG_SEND_MESSAGE_FAILED",
	ATTACHMENT_REJECTED: "OSE_MSG_ATTACHMENT_REJECTED",
	ATTACHMENT_UPLOAD_FAILED: "OSE_MSG_ATTACHMENT_UPLOAD_FAILED",
	FETCH_MESSAGES_FAILED: "OSE_MSG_FETCH_MESSAGES_FAILED",
	TRANSCRIPT_UNAVAILABLE: "OSE_MSG_TRANSCRIPT_UNAVAILABLE",
	INVALID_STATE: "OSE_MSG_INVALID_STATE",
	SESSION_ENDED: "OSE_MSG_SESSION_ENDED",
	CONVERSATION_NOT_FOUND: "OSE_MSG_CONVERSATION_NOT_FOUND",
	JWT_INVALID: "OSE_MSG_JWT_INVALID",
	SERVER_UNREACHABLE: "OSE_MSG_SERVER_UNREACHABLE",
	OPERATION_TIMEOUT: "OSE_MSG_OPERATION_TIMEOUT",
	SERVER_ERROR: "OSE_MSG_SERVER_ERROR",
	SDK_NOT_INITIALIZED: "OSE_MSG_SDK_NOT_INITIALIZED",
	MALFORMED_SERVER_EVENT: "OSE_MSG_MALFORMED_SERVER_EVENT"
}, N = {
	INVALID_MESSAGE_ELEMENT_TYPE: {
		code: M.INVALID_MESSAGE_ELEMENT_TYPE,
		detail: "invalid-message-element-type",
		message: c("Invalid message element type")
	},
	INVALID_ELEMENT_TYPE: {
		code: M.MALFORMED_SERVER_EVENT,
		detail: "invalid-element-type",
		message: "Invalid element type"
	},
	INVALID_ACTION_TYPE: {
		code: M.MALFORMED_SERVER_EVENT,
		detail: "invalid-action-type",
		message: "Invalid action type"
	},
	SEND_MESSAGE_FAILED: {
		code: M.SEND_MESSAGE_FAILED,
		detail: "send-message-failed",
		message: c("Failed to send message")
	},
	SEND_MESSAGE_STATUS_FAILED: {
		code: M.SEND_MESSAGE_FAILED,
		detail: "send-message-status-failed",
		message: c("Failed to acknowledge message delivery status")
	},
	MALICIOUS_CONTENT_DETECTED: {
		code: M.ATTACHMENT_REJECTED,
		detail: "malicious-content-detected",
		message: c("A virus has been detected in the attachment")
	},
	GENERATE_SIGNED_UPLOAD_URL_FAILED: {
		code: M.ATTACHMENT_UPLOAD_FAILED,
		detail: "generate-signed-upload-url-failed",
		message: c("Failed to Generate Signed Upload URL")
	},
	UPLOAD_ATTACHMENT_FAILED: {
		code: M.ATTACHMENT_UPLOAD_FAILED,
		detail: "upload-attachment-failed",
		message: c("Failed to upload attachment")
	},
	UPLOAD_ATTACHMENT_REQUEST_FAILED: {
		code: M.ATTACHMENT_UPLOAD_FAILED,
		detail: "upload-attachment-request-failed",
		message: "Failed to upload attachment"
	},
	LIST_CONVERSATION_MESSAGES_FAILED: {
		code: M.FETCH_MESSAGES_FAILED,
		detail: "list-conversation-messages-failed",
		message: c("Failed to list conversation messages")
	},
	FETCHING_ADDITIONAL_MESSAGES_FAILED: {
		code: M.FETCH_MESSAGES_FAILED,
		detail: "fetching-additional-messages-failed",
		message: c("Failed to fetch additional messages")
	},
	FAILED_TO_DOWNLOAD_TRANSCRIPT: {
		code: M.TRANSCRIPT_UNAVAILABLE,
		detail: "failed-to-download-transcript",
		message: c("Failed to download transcript")
	},
	MESSAGING_TRANSCRIPT_UNAVAILABLE: {
		code: M.TRANSCRIPT_UNAVAILABLE,
		detail: "messaging-transcript-unavailable",
		message: c("Messaging transcript unavailable")
	},
	DIALOG_INVALID_STATE: {
		code: M.INVALID_STATE,
		detail: "dialog-invalid-state",
		message: c("Invalid dialog state")
	},
	CREATION_FAILED_ENGAGEMENT_EXISTS: {
		code: M.INVALID_STATE,
		detail: "creation-failed-engagement-exists",
		message: c("Engagement creation failed. Messaging engagement already exists")
	},
	OPERATION_ON_DEFUNCT_CONVERSATION: {
		code: M.INVALID_STATE,
		detail: "operation-on-defunct-conversation",
		message: c("No operations allowed on Conversation in CLOSING / CLOSED state")
	},
	OPERATION_ON_OPEN_CONVERSATION: {
		code: M.INVALID_STATE,
		detail: "operation-on-open-conversation",
		message: c("Operation not allowed on Conversation in OPEN state")
	},
	OPERATION_ON_CLOSED_CHANNEL: {
		code: M.INVALID_STATE,
		detail: "operation-on-closed-channel",
		message: c("No operations allowed on closed channel")
	},
	OPERATION_ON_ACTIVE_CHANNEL: {
		code: M.INVALID_STATE,
		detail: "operation-on-active-channel",
		message: c("Operation not allowed on active channel")
	},
	RECONNECT_WITHOUT_STREAM_FAILURE: {
		code: M.INVALID_STATE,
		detail: "reconnect-without-stream-failure",
		message: "Reconnection is allowed only in case of EventStreamFailure"
	},
	SESSION_NOT_FOUND: {
		code: M.SESSION_ENDED,
		detail: "session-not-found",
		message: c("Session not found")
	},
	ENGAGEMENT_NOT_FOUND: {
		code: M.CONVERSATION_NOT_FOUND,
		detail: "engagement-not-found",
		message: c("Engagement not found")
	},
	ENGAGEMENT_ABSENT_IN_CONVERSATION: {
		code: M.CONVERSATION_NOT_FOUND,
		detail: "engagement-absent-in-conversation",
		message: c("Engagement not found in conversation")
	},
	CREATION_FAILED_CONVERSATION_NOT_FOUND: {
		code: M.CONVERSATION_NOT_FOUND,
		detail: "creation-failed-conversation-not-found",
		message: c("Engagement creation failed. Conversation not found")
	},
	JOIN_FAILED_CONVERSATION_NOT_FOUND: {
		code: M.CONVERSATION_NOT_FOUND,
		detail: "join-failed-conversation-not-found",
		message: c("Join failed. Conversation not found")
	},
	JWT_INVALID: {
		code: M.JWT_INVALID,
		message: c("Invalid JWT")
	},
	SERVER_UNREACHABLE: {
		code: M.SERVER_UNREACHABLE,
		message: c("Server is unreachable")
	},
	OPERATION_TIMEOUT: {
		code: M.OPERATION_TIMEOUT,
		message: c("The requested operation took too long to complete")
	},
	SERVER_RESPONDED_UNEXPECTEDLY: {
		code: M.SERVER_ERROR,
		detail: "server-responded-unexpectedly",
		message: c("Server responded unexpectedly")
	},
	GET_SESSION_FAILED: {
		code: M.SERVER_ERROR,
		detail: "get-session-failed",
		message: c("Failed to get session details")
	},
	CREATE_DIALOG_FAILED: {
		code: M.SERVER_ERROR,
		detail: "create-dialog-failed",
		message: c("Failed to create dialog")
	},
	LIST_CONVERSATION_UNEXPECTED_STATUS: {
		code: M.SERVER_ERROR,
		detail: "list-conversation-unexpected-status",
		message: "List conversation api responded with an unexpected status"
	},
	GET_SESSION_UNEXPECTED_STATUS: {
		code: M.SERVER_ERROR,
		detail: "get-session-unexpected-status",
		message: "Get session api responded with an unexpected status"
	},
	JOIN_ENGAGEMENT_FAILED: {
		code: M.SERVER_ERROR,
		detail: "join-engagement-failed",
		message: "Failed to join Engagement"
	},
	SDK_NOT_INITIALIZED: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "sdk-not-initialized",
		message: "Omni SDK is not initialized."
	},
	EVENT_DISPATCHER_UNAVAILABLE: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "event-dispatcher-unavailable",
		message: "EventDispatcher is undefined"
	},
	SESSION_VALIDITY_CHECK_UNAVAILABLE: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "session-validity-check-unavailable",
		message: "isSessionValid is undefined"
	},
	LOGGER_FACTORY_UNAVAILABLE: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "logger-factory-unavailable",
		message: "LoggerFactory is undefined"
	},
	REST_CONTROLLER_UNAVAILABLE: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "rest-controller-unavailable",
		message: "RestController is undefined"
	},
	INTERNAL_CONFIG_UNAVAILABLE: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "internal-config-unavailable",
		message: "OmniSdkInternalConfig is undefined"
	},
	SESSION_ID_UNAVAILABLE: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "session-id-unavailable",
		message: "SessionId is undefined"
	},
	TOKEN_UNAVAILABLE: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "token-unavailable",
		message: "Token is undefined"
	},
	DELIVERY_NOTIFICATION_FLAG_UNAVAILABLE: {
		code: M.SDK_NOT_INITIALIZED,
		detail: "delivery-notification-flag-unavailable",
		message: "isDeliveryNotificationEnabled is undefined"
	},
	INVALID_MESSAGE_EVENT: {
		code: M.MALFORMED_SERVER_EVENT,
		detail: "invalid-message-event",
		message: "Invalid Message Event"
	},
	UNKNOWN_TYPING_UPDATE_TYPE: {
		code: M.MALFORMED_SERVER_EVENT,
		detail: "unknown-typing-update-type",
		message: "Unknown typing update type"
	},
	TYPING_UPDATE_PARTICIPANT_MISSING: {
		code: M.MALFORMED_SERVER_EVENT,
		detail: "typing-update-participant-missing",
		message: "eventTransformer: Missing participant in toInboundTypingUpdate"
	},
	PARTICIPANT_EVENT_PARTICIPANT_MISSING: {
		code: M.MALFORMED_SERVER_EVENT,
		detail: "participant-event-participant-missing",
		message: "eventTransformer: Missing participant in toParticipantEvent"
	}
};
function ft(e) {
	return s.is(e) && e.code.startsWith("OSE_MSG_");
}
var P, pt, F, I, L, mt, ht, gt;
(function(e) {
	e.PLAINTEXT = "PLAINTEXT", e.HTML = "HTML", e.MARKDOWN = "MARKDOWN";
})(P ||= {}), function(e) {
	e.PENDING = "PENDING", e.ACTIVE = "ACTIVE", e.TERMINATING = "TERMINATING", e.TERMINATED = "TERMINATED";
}(pt ||= {}), function(e) {
	e.TEXT = "text", e.IMAGE = "image", e.FILE = "file", e.REPLY = "reply", e.POST_BACK = "postback", e.LOCATION = "location", e.CAROUSEL = "carousel";
}(F ||= {}), function(e) {
	e.LINK = "link", e.POST_BACK = "postback", e.REPLY = "reply", e.LOCATION_REQUEST = "locationRequest";
}(I ||= {}), function(e) {
	e.TEXT = "text", e.IMAGE = "image", e.FILE = "file", e.POST_BACK = "postback", e.REPLY = "reply", e.LOCATION = "location";
}(L ||= {}), function(e) {
	e.POST_BACK = "postback", e.REPLY = "reply";
}(mt ||= {}), function(e) {
	e.Reconnection = "LongPollingReconnectionTimer";
}(ht ||= {}), function(e) {
	e.PENDING = "pending", e.SENT = "sent", e.DELIVERED = "delivered", e.FAILED = "failed";
}(gt ||= {});
var R = {
	...ve,
	MESSAGING_CHANNEL_NAME: "messaging",
	CREATE_ENGAGEMENT_FAILED: "Failed to create engagement",
	LONG_POLLING_STARTING: "Starting long polling",
	EVENT_STREAM_CONNECTING: "Connecting to event stream",
	LONG_POLLING_PAUSED: "Long polling paused",
	LONG_POLLING_STOPPED: "Long polling stopped",
	LONG_POLLING_RESUMING: "Resuming long polling",
	RECEIVED_NEW_EVENTS: "Received new events",
	NO_NEW_EVENTS: "No new events",
	SEND_MESSAGE_CALLED: "sendMessage called",
	SEND_MESSAGE_SUCCESSFUL: "Send Message Successful",
	ENGAGEMENT_CREATED: "Engagement created",
	REMOVING_ENGAGEMENT: "Removing engagement",
	EVENT_STREAM_CONNECTED: "Event stream connected",
	EVENT_STREAM_FAILED: "Event stream failed",
	EVENT_STREAM_CLOSED: "Event stream closed",
	MESSAGE_ARRIVED: "Message arrived",
	MESSAGE_DELIVERED: "Message delivered",
	LIST_CONVERSATION_CALLED: "listConversation called",
	FETCHED_ALL_MESSAGES: "Fetched all messages",
	ITERATOR_ITEMS_CALLED: "iteratorItems called",
	ITERATOR_NEXT_CALLED: "iteratorNext called",
	ITERATOR_PREVIOUS_CALLED: "iteratorPrevious called",
	FETCHING_ADDITIONAL_MESSAGES: "Fetching additional messages",
	ITERATOR_HAS_NEXT_CALLED: "iteratorHasNext called",
	ITERATOR_HAS_PREVIOUS_CALLED: "iteratorHasPrevious called",
	STARTING_ATTACHMENT_UPLOAD: "Starting attachment upload",
	SERVER_RESPONDED_WITH: "Server responded with ",
	UPLOAD_ATTACHMENT_CALLED: "uploadAttachment called",
	PRESIGNED_UPLOAD_URL_FETCHED: "Presigned upload url fetched",
	UPLOAD_ATTACHMENT_FAILED: "Failed to upload attachment",
	MEDIA_FILE: "mediaFile",
	MIME_TYPE_IMAGE: "image",
	MIME_TYPE_FILE: "file",
	Attachment: {
		shouldBeFile: "Attachment should be a file",
		size: {
			shouldNotBeLessThan: "Attachment size should not be empty file",
			shouldNotBeMoreThan: "Attachment should not be more maximum configured size"
		},
		type: {
			shouldBeValid: "Attachment should have a valid MIME type",
			shouldBeSupported: "Attachment type should be one of the supported ones"
		},
		name: {
			shouldNotBeMoreThan: "Attachment file name should not be more than 100 characters",
			shouldNotBeLessThan: "Attachment file name should not be empty string"
		}
	},
	RECONNECTION_TIMEOUT: 3e5,
	DEFAULT_MIME_TYPE: "application/octet-stream",
	MESSAGING_ENGAGEMENT_EXISTS: "Maximum number of engagements allowed for an user has exceeded",
	RESPONSE_ERROR_CONVERSATION_CLOSED: "No active conversation found for the user",
	ENGAGEMENT_NOT_FOUND: "Engagement not found",
	DIALOG_NOT_FOUND: "Dialog not found",
	PATH_NOT_FOUND: "Path not found",
	DOWNLOAD_TRANSCRIPT_FAILED: "Failed to download transcript",
	SEND_MESSAGE_TIMEOUT: 6e4,
	ALTERNATIVE_ATTACHMENT_EVENT_ARRIVAL_TIMEOUT: 24e4,
	BYTE_LENGTH_CORRELATION_ID: 8,
	BYTE_LENGTH_MESSAGE_ID: 13,
	SEND_MESSAGE_STATUS_CALLED: "sendMessageStatus called",
	SEND_MESSAGE_STATUS_SUCCESSFUL: "sendMessageStatus successful",
	DELIVERY_ACK_BATCH_SIZE: 50,
	DELIVERY_ACK_RETRY_ATTEMPTS: 3,
	DELIVERY_ACK_RETRY_DELAY_MS: 500
}, _t = "messaging", vt = {
	botname: "botname",
	considerSentOnDelivered: "considerSentOnDelivered"
}, z = {
	TypingIndicators: {
		name: "typingNotification",
		PropertyKeys: {
			inbound: "CCToCustomer",
			outbound: "customerToCC"
		}
	},
	Notifications: {
		name: "notifications",
		PropertyKeys: { deliveryNotificationEnabled: "deliveryNotificationEnabled" }
	}
}, B = Object.freeze({
	HostURL: {
		shouldBeString: "Host URL should be string",
		shouldBeHttpsUrl: "Host URL should be a valid URL string with HTTPS scheme"
	},
	IntegrationId: {
		shouldBeString: "integrationId should be string",
		shouldBeUUID: "integrationId should be a UUID string"
	},
	Token: {
		shouldBeString: "JWT Token should be string",
		shouldHaveValidFormat: "JWT Token should be a string with valid format",
		shouldBeLive: "JWT Token should be live"
	},
	DisplayName: {
		shouldBeString: "Display name should be a string",
		shouldNotBeMoreThan: "Display name should not be more than 70 characters"
	},
	SessionParameters: { shouldBeObject: "SessionParameters should be object of type {key: string (64 max length) -> value: string (256 max length)} with maximum 20 records" },
	LogLevel: { shouldBeOneOf: "Log Level should be one of [SILENT, DEBUG, INFO, WARN, ERROR]" },
	Config: {
		shouldBeObject: "Config should be an object",
		ReconnectionTimeout: {
			shouldBeNumber: "Reconnection timeout must be a number",
			shouldNotBeMoreThan: "Reconnection timeout must not be more than 900 seconds",
			shouldNotBeLessThan: "Reconnection timeout must not be less than 120 seconds"
		},
		IdleTimeout: {
			shouldBeNumber: "Idle timeout must be a number",
			shouldNotBeMoreThan: "Idle timeout must not be more than 3300 seconds",
			shouldNotBeLessThan: "Idle timeout must not be less than 300 seconds"
		},
		GraceTimeout: {
			shouldBeNumber: "Idle shutdown grace timeout must be a number",
			shouldNotBeMoreThan: "Idle shutdown grace timeout must not be more than 300 seconds",
			shouldNotBeLessThan: "Idle shutdown grace timeout must not be less than 30 seconds"
		}
	},
	ShutdownReason: { shouldBeOneOf: "Shutdown Reason should be one of [SYSTEM_CLOSED, USER_CLOSED]" },
	EngagementId: {
		shouldBeString: "engagementId should be string",
		shouldBeUUID: "engagementId should be UUID"
	},
	EngagementParameters: { shouldBeObject: "Engagement Parameters should be an object of type {key: string (64 max length) -> value: string (256 max length)} with maximum 20 records" },
	ParticipantId: {
		shouldBeString: "participantId should be a string",
		shouldBeUUID: "participantId should be an UUID"
	},
	PageSize: {
		shouldBeNumber: "Page size should be a number",
		shouldBeNaturalNumber: "Page size should be a natural number",
		shouldBeBetween: "Page size should between 1 and 50"
	},
	Message: {
		shouldBeStringOrObject: "Message should be string or object",
		shouldNotBeEmpty: "Message should not be an empty string",
		shouldNotBeMoreThan: "Message length should not be more than 4096 characters"
	},
	ParentMessageId: { shouldBeUUID: "parentMessageId should be a valid UUID string" },
	EngagementDisconnectionReason: { shouldBeOneOf: "Engagement disconnection reason should be one of [SYSTEM_CLOSED, USER_CLOSED, USER_INACTIVE]" },
	EventHandler: { shouldBeFunction: "Event Handler should a function" },
	Location: { shouldBeObject: "Location should be object" },
	LocationCoordinates: {
		shouldBeNumber: "Latitude and Longitude should be numbers",
		shouldBeValidLatitude: "Latitude should be a number between [-90, 90]",
		shouldBeValidLongitude: "Longitude should be a number between [-180, 180]"
	},
	LocationDetails: {
		name: {
			shouldBeString: "Location name should be string",
			shouldNotBeMoreThan: "Location name shouldn't be more than 50 characters",
			shouldNotBeEmpty: "Location name should not be an empty string"
		},
		address: {
			shouldBeString: "Location address should be string",
			shouldNotBeMoreThan: "Location address shouldn't be more than 512 characters",
			shouldNotBeEmpty: "Location address should not be an empty string"
		}
	},
	Action: {
		shouldBeObject: "Action should be an object and not null",
		text: {
			shouldBeString: "Text should be string",
			shouldNotBeMoreThan: "Text shouldn't be more than 512 characters",
			shouldNotBeEmpty: "Text shouldn't be an empty string"
		},
		payload: {
			shouldBeString: "Payload should be string",
			shouldNotBeMoreThan: "Payload shouldn't be more tha 512 characters",
			shouldNotBeEmpty: "Payload shouldn't be an empty string"
		},
		iconUrl: {
			shouldBeString: "IconUrl should be string",
			shouldBeHttps: "IconUrl should be a valid https url",
			shouldNotBeMoreThan: "IconUrl shouldn't be more than 2048 characters"
		},
		actionType: { shouldBeOneOf: "ActionType should be one of [postback, reply]" }
	},
	PostBackActionType: { shouldBePostBack: "Type should be 'postback'" },
	ReplyActionType: { shouldBeReply: "Type should be 'reply'" },
	Text: {
		shouldBeString: "Text should be string",
		shouldNotBeMoreThan: "Text shouldn't be more than 4096 characters",
		shouldNotBeEmpty: "Text shouldn't be an empty string"
	},
	TextType: { shouldBeValid: "TextType should be one of [PLAINTEXT, HTML, MARKDOWN]" },
	Attachment: {
		shouldBeFile: "Attachment should be a file",
		size: {
			shouldNotBeLessThan: "Attachment should not be an empty file",
			shouldNotBeMoreThan: "Attachment should not be more maximum configured size"
		},
		type: {
			shouldBeValid: "Attachment should have a valid MIME type",
			shouldBeSupportedExtension: "Attachment type should be one of the supported ones"
		},
		name: { shouldNotBeLessThan: "Attachment file name should not be empty string" }
	}
}), yt = 4096, bt = 1, xt = 1, St = 512, Ct = 512, wt = 2048, Tt = -90, Et = 90, Dt = -180, Ot = 180, kt = 50, At = 512, jt = 1, Mt = 50, Nt = 50, Pt = 1, V = class {
	static areConversationsClosable(e) {
		return e.getFeatureOrDefault("conversations", {
			name: "conversations",
			properties: { closable: "true" },
			configurations: []
		}).getRawPropertyOrDefault("closable", "false") === "true";
	}
	static isConversationNotFoundResponse(e, t) {
		return e === 400 && !!t.detail?.startsWith(R.RESPONSE_ERROR_CONVERSATION_CLOSED);
	}
	static useAlternativeAttachmentFlow(e) {
		return !0 === e.getSubFeature("attachments")?.isEnabled;
	}
	static transformToAlternativeAttachmentBody(e) {
		return {
			attachment: e.getAttachment(),
			text: e.getText() === void 0 ? "" : e.getText()
		};
	}
	static getListOfSupportedAttachmentExtensions(e) {
		return e.hasSubFeature("attachments") ? e.getSubFeature("attachments")?.getRawProperty("allowedAttachmentTypes")?.split(",") ?? [] : [];
	}
	static isDeliveryNotificationEnabled(e) {
		return e.getSubFeature(z.Notifications.name)?.getRawProperty(z.Notifications.PropertyKeys.deliveryNotificationEnabled) === "true";
	}
	static getMaxAttachmentSize(e) {
		if (e.hasSubFeature("attachments")) {
			let t = e.getSubFeature("attachments")?.getRawProperty("maxAttachmentSizeMb"), n = Number(t);
			return isNaN(n) ? Nt : n;
		}
		return Nt;
	}
}, Ft = class {
	static isEngagementExistsResponse(e, t) {
		return !(e !== 400 || !t.violations?.some(((e) => e.field === "engagementId" && e.message === R.MESSAGING_ENGAGEMENT_EXISTS)));
	}
}, It = class {
	static isObjectSendMessageBody(e) {
		return typeof e == "object" && !!("elementType" in e && typeof e.elementType == "string" && "elementText" in e && this.isObjectElementText(e.elementText) && (e.richMediaPayload === void 0 || "richMediaPayload" in e && this.isObjectSendMessageRichMediaPayload(e.richMediaPayload)));
	}
	static isObjectElementText(e) {
		return typeof e == "object" && !!("text" in e && typeof e.text == "string" && "textFormat" in e && typeof e.textFormat == "string" && Object.values(P).includes(e.textFormat));
	}
	static isObjectSendMessageRichMediaPayload(e) {
		return typeof e == "object" && !!((e.mediaUrl === void 0 || "mediaUrl" in e && typeof e.mediaUrl == "string") && (e.selectedAction === void 0 || "selectedAction" in e && this.isObjectSendMessageAction(e.selectedAction)) && (e.coordinates === void 0 || "coordinates" in e && this.isObjectSendMessageCoordinates(e.coordinates)) && (e.location === void 0 || "location" in e && this.isObjectSendMessageLocation(e.location)) && (e.attachmentIds === void 0 || "attachmentIds" in e && Array.isArray(e.attachmentIds)));
	}
	static isObjectSendMessageAction(e) {
		return typeof e == "object" && !!("type" in e && typeof e.type == "string" && Object.values(I).includes(e.type) && (e.text === void 0 || "text" in e && typeof e.text == "string") && (e.payload === void 0 || "payload" in e && typeof e.payload == "string") && (e.iconUrl === void 0 || "iconUrl" in e && typeof e.iconUrl == "string"));
	}
	static isObjectSendMessageLocation(e) {
		return typeof e == "object" && (e.name === void 0 || "name" in e && typeof e.name == "string") && (e.address === void 0 || "address" in e && typeof e.address == "string");
	}
	static isObjectSendMessageCoordinates(e) {
		return typeof e == "object" && "lat" in e && typeof e.lat == "number" && "long" in e && typeof e.long == "number";
	}
	static equalSendMessageBody(e, t) {
		return e === void 0 && t === void 0 || !(!this.isObjectSendMessageBody(e) || !this.isObjectSendMessageBody(t)) && e.elementType === t.elementType && !!this.elementTextEqual(e.elementText, t.elementText) && !!this.richMediaPayloadEqual(e.richMediaPayload, t.richMediaPayload);
	}
	static transformToAlternativeAttachmentBody(e) {
		return {
			attachment: e.getAttachment(),
			text: e.getText() === void 0 ? "" : e.getText()
		};
	}
	static elementTextEqual(e, t) {
		return !(e === void 0 && t !== void 0 || e !== void 0 && t === void 0) && !(!this.isObjectElementText(e) || !this.isObjectElementText(t)) && e.text === t.text && e.textFormat === t.textFormat;
	}
	static richMediaPayloadEqual(e, t) {
		return e === void 0 && t === void 0 || !(e === void 0 && t !== void 0 || e !== void 0 && t === void 0) && !(!this.isObjectSendMessageRichMediaPayload(e) || !this.isObjectSendMessageRichMediaPayload(t)) && !!this.attachmentsEqual(e.attachmentIds, t.attachmentIds) && !!this.coordinatesEqual(e.coordinates, t.coordinates) && !!this.locationsEqual(e.location, t.location) && !!this.selectedActionEqual(e.selectedAction, t.selectedAction) && e.mediaUrl === t.mediaUrl;
	}
	static selectedActionEqual(e, t) {
		return e === void 0 && t === void 0 || !(e === void 0 && t !== void 0 || e !== void 0 && t === void 0) && !(!this.isObjectSendMessageAction(e) || !this.isObjectSendMessageAction(t)) && e.type === t.type && e.payload === t.payload && e.text === t.text && e.iconUrl === t.iconUrl;
	}
	static coordinatesEqual(e, t) {
		return e === void 0 && t === void 0 || !(e === void 0 && t !== void 0 || e !== void 0 && t === void 0) && !(!this.isObjectSendMessageCoordinates(e) || !this.isObjectSendMessageCoordinates(t)) && e.lat === t.lat && e.long === t.long;
	}
	static locationsEqual(e, t) {
		return e === void 0 && t === void 0 || !(e === void 0 && t !== void 0 || e !== void 0 && t === void 0) && !(!this.isObjectSendMessageLocation(e) || !this.isObjectSendMessageLocation(t)) && e.address === t.address && e.name === t.name;
	}
	static attachmentsEqual(e, t) {
		if (e === void 0 && t === void 0) return !0;
		if (e === void 0 && t !== void 0 || e !== void 0 && t === void 0 || !Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) return !1;
		for (let n of e) if (!t.includes(n)) return !1;
		return !0;
	}
	static mapSendMessageElementTypeToElementType(e) {
		switch (e) {
			case L.TEXT: return F.TEXT;
			case L.FILE: return F.FILE;
			case L.IMAGE: return F.IMAGE;
			case L.LOCATION: return F.LOCATION;
			case L.POST_BACK: return F.POST_BACK;
			case L.REPLY: return F.REPLY;
			default: throw new s(N.INVALID_MESSAGE_ELEMENT_TYPE);
		}
	}
	static isMaliciousContentDetectedResponse(e, t) {
		return e === 400 && t.title === "VALIDATION_FAILED" && (t.violations?.some(((e) => e.field === "attachment" && e.code === 9001)) ?? !1);
	}
};
function Lt(e, t) {
	let n = parseInt(e, 10);
	switch (t.toLowerCase()) {
		case "seconds": return 1e3 * n;
		case "minutes": return 60 * n * 1e3;
		case "hours": return 60 * n * 60 * 1e3;
		default: return 0;
	}
}
function Rt(e) {
	let t = `^${e.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`;
	return new RegExp(t);
}
var H = class {
	static dispatchSessionErrorEvent(e, t, n, r) {
		let i = {
			sessionId: e,
			eventDate: /* @__PURE__ */ new Date(),
			errorReason: t
		};
		r.debug("dispatchSessionErrorEvent()", "Dispatching session error event", i), n.processEvents([{
			type: y.SESSION_ERROR,
			event: i
		}]);
	}
	static isSessionNotFoundResponse(e, t) {
		return e === 404 && t.detail === R.SESSION_NOT_FOUND;
	}
}, zt, Bt, Vt, Ht;
(function(e) {
	e.PENDING = "PENDING", e.ACTIVE = "ACTIVE", e.TERMINATING = "TERMINATING", e.TERMINATED = "TERMINATED";
})(zt ||= {}), function(e) {
	e[e.AddParticipant = 0] = "AddParticipant", e[e.RemoveParticipant = 1] = "RemoveParticipant";
}(Bt ||= {}), function(e) {
	e.WEB = "web";
}(Vt ||= {}), function(e) {
	e.SELF = "SELF", e.EXISTING = "EXISTING", e.REMOTE = "REMOTE";
}(Ht ||= {});
var U = {
	GET_SESSION: {
		requestType: D.GET,
		path: (e, t) => `/v1/messaging-integrations/${e}/sessions/${t}`
	},
	CREATE_ENGAGEMENT: {
		requestType: D.POST,
		path: (e) => `/v1/messaging-integrations/${e}/engagements`
	},
	SEND_MESSAGE: {
		requestType: D.POST,
		path: (e, t) => `/v1/messaging-integrations/${e}/engagements/${t}/messages`
	},
	SEND_MESSAGE_WITH_ATTACHMENT: {
		requestType: D.POST,
		path: (e, t, n) => `/v1/${e}/${t}/engagements/${n}/attachments`
	},
	JOIN_ENGAGEMENT: {
		requestType: D.POST,
		path: (e, t) => `/v1/messaging-integrations/${e}/engagements/${t}:join`
	},
	LIST_CONVERSATION: {
		requestType: D.GET,
		path: (e, t, n, r, i, a) => `/v1/messaging-integrations/${e}/conversations/${t}/messages?sessionId=${n}&conversationSessionId=${r}&pageSize=${i}&pageNumber=${a}&orderby=desc`
	},
	GENERATE_UPLOAD_URL: {
		requestType: D.POST,
		path: (e, t) => `/v1/messaging-integrations/${e}/engagements/${t}:generateUploadUrl`
	},
	SEND_TYPING_INDICATOR: {
		requestType: D.POST,
		path: (e, t) => `/v1/messaging-integrations/${e}/engagements/${t}:typing`
	},
	DOWNLOAD_TRANSCRIPT: {
		requestType: D.POST,
		path: (e, t) => `/v1/messaging-integrations/${e}/conversations/${t}/transcript`
	},
	SEND_MESSAGE_STATUS: {
		requestType: D.POST,
		path: (e) => `/v1/messaging-integrations/${e}/messages/status`
	}
};
function Ut(e) {
	return {
		elementType: Wt(e.elementType),
		elementText: {
			text: e.elementText.text,
			textFormat: Gt(e.elementText.textFormat)
		},
		richMediaPayload: e.richMediaPayload ? Kt(e.richMediaPayload) : void 0
	};
}
function Wt(e) {
	switch (e) {
		case "text": return F.TEXT;
		case "location": return F.LOCATION;
		case "postback": return F.POST_BACK;
		case "reply": return F.REPLY;
		case "file": return F.FILE;
		case "image": return F.IMAGE;
		case "carousel": return F.CAROUSEL;
		default: throw new s(N.INVALID_ELEMENT_TYPE);
	}
}
function Gt(e) {
	switch (e) {
		case "PLAINTEXT": return P.PLAINTEXT;
		case "HTML": return P.HTML;
		case "MARKDOWN": return P.MARKDOWN;
	}
}
function Kt(e) {
	let t = {};
	var n, r;
	return e.selectedAction && (t.selectedAction = qt(e.selectedAction)), e.actions && (t.actions = e.actions.map(qt)), e.items && (t.items = e.items.map(Yt)), e.coordinates && (t.coordinates = {
		lat: (n = e.coordinates).lat,
		long: n.long
	}), e.location && (t.location = {
		address: (r = e.location).address,
		name: r.name
	}), e.attachmentIds && (t.attachmentIds = e.attachmentIds), t;
}
function qt(e) {
	return {
		type: Jt(e.type.toUpperCase()),
		text: e.text,
		payload: e.payload,
		iconUrl: e.iconUrl,
		uri: e.uri
	};
}
function Jt(e) {
	switch (e) {
		case "POSTBACK": return I.POST_BACK;
		case "REPLY": return I.REPLY;
		case "LINK": return I.LINK;
		case "LOCATIONREQUEST": return I.LOCATION_REQUEST;
		default: throw new s(N.INVALID_ACTION_TYPE);
	}
}
function Yt(e) {
	return {
		title: e.title,
		mediaUrl: e.mediaUrl,
		description: e.description,
		actions: e.actions.map(qt)
	};
}
function Xt(e) {
	return {
		attachmentId: e.attachmentId,
		contentType: e.contentType,
		attachmentName: e.name,
		attachmentSize: e.size,
		attachmentUrl: e.url
	};
}
function Zt(e) {
	return {
		dialogId: e.dialogId,
		dialogStatus: Qt(e.dialogStatus),
		createdAt: e.createdAt,
		lastUpdatedAt: e.lastUpdatedAt,
		participants: e.participants.map(((e) => ({
			participantId: e.participantId,
			participantType: $t(e.participantType),
			displayName: e.displayName
		})))
	};
}
function Qt(e) {
	switch (e) {
		case "PENDING": return A.DialogStatus.PENDING;
		case "ACTIVE": return A.DialogStatus.ACTIVE;
		case "TERMINATING": return A.DialogStatus.TERMINATING;
		case "TERMINATED": return A.DialogStatus.TERMINATED;
	}
}
function $t(e) {
	switch (e) {
		case "CUSTOMER": return A.ParticipantType.CUSTOMER;
		case "AGENT": return A.ParticipantType.AGENT;
		case "SUPERVISOR": return A.ParticipantType.SUPERVISOR;
		case "BOT": return A.ParticipantType.BOT;
		case "SYSTEM": return A.ParticipantType.SYSTEM;
	}
}
function en(e) {
	return {
		messageId: e.messageId,
		conversationId: e.conversationId,
		body: Ut(e.body),
		_messageIndex: e.messageIndex,
		parentMessageId: e.parentMessageId,
		senderParticipant: S(e.senderParticipantId, e.participantType, x.MESSAGING, e.displayName),
		receivedAt: e.receivedAt ? new Date(e.receivedAt) : /* @__PURE__ */ new Date(),
		lastUpdatedAt: e.lastUpdatedAt ? new Date(e.lastUpdatedAt) : /* @__PURE__ */ new Date(),
		attachments: e.attachments?.map(((e) => Xt(e))),
		canned: e.canned ?? !1
	};
}
var tn = class {
	engagementId;
	conversationId;
	defaultDialog;
	engagementParameters;
	sessionId;
	restController;
	config;
	engagementStatus;
	logger;
	creationSource;
	constructor(e, t, n, r, i, a, o) {
		var s;
		this.sessionId = e, this.restController = r, this.config = i, this.logger = a("MessagingEngagement"), this.creationSource = o, this.engagementId = n.engagementId, this.conversationId = t, this.engagementStatus = zt.PENDING, this.defaultDialog = {
			dialogId: (s = n.dialogs[0]).dialogId,
			createdAt: s.createdAt,
			lastUpdatedAt: s.lastUpdatedAt,
			participants: s.participants.map(((e) => S(e.participantId, e.participantType, x.MESSAGING, e.displayName)))
		}, this.engagementParameters = n.engagementParameters ?? {};
	}
	get participants() {
		return this.defaultDialog.participants;
	}
	get status() {
		return this.engagementStatus;
	}
	updateEngagementStatus(e) {
		if (this.engagementStatus === e) return void this.logger.debug("updateEngagementStatus()", `Engagement status is already ${e}`, this.logContext);
		let t = this.engagementStatus;
		this.engagementStatus = e, this.logger.debug("updateEngagementStatus()", `Engagement status changed: ${t} -> ${e}`, {
			...this.logContext,
			fromState: t,
			toState: e
		});
	}
	get logContext() {
		return {
			sessionId: this.sessionId,
			conversationId: this.conversationId,
			engagementId: this.engagementId
		};
	}
	async joinEngagement() {
		let e = await this.restController.send({
			methodType: U.JOIN_ENGAGEMENT.requestType,
			url: U.JOIN_ENGAGEMENT.path(this.config.integrationId, this.engagementId),
			isUrlFull: !1,
			requestBody: JSON.stringify({
				dialogId: this.defaultDialog.dialogId,
				sessionId: this.sessionId
			})
		});
		if (!e.ok) {
			let t = await e.json();
			throw V.isConversationNotFoundResponse(e.status, t) ? new s(N.JOIN_FAILED_CONVERSATION_NOT_FOUND, { metadata: { httpStatus: e.status } }) : new s(N.JOIN_ENGAGEMENT_FAILED, { metadata: { httpStatus: e.status } });
		}
		return await e.json();
	}
	async sendMessage(e, t, n, r) {
		if (this.logger.debug("sendMessage()", R.SEND_MESSAGE_CALLED, {
			...this.logContext,
			correlationId: t
		}), this.engagementStatus !== zt.ACTIVE) throw this.logger.error("sendMessage()", "Invalid dialog state: " + this.engagementStatus, this.logContext), new s(N.DIALOG_INVALID_STATE);
		let i = {
			dialogId: this.defaultDialog.dialogId,
			sessionId: this.sessionId,
			parentMessageId: r,
			body: e,
			correlationId: t,
			cannedMessages: n.length > 0 ? n : void 0
		}, a = await this.restController.send({
			methodType: U.SEND_MESSAGE.requestType,
			url: U.SEND_MESSAGE.path(this.config.integrationId, this.engagementId),
			isUrlFull: !1,
			requestBody: JSON.stringify(i)
		});
		if (!a.ok) {
			let e = await a.json();
			throw It.isMaliciousContentDetectedResponse(a.status, e) ? new s(N.MALICIOUS_CONTENT_DETECTED, { metadata: { httpStatus: a.status } }) : H.isSessionNotFoundResponse(a.status, e) ? new s(N.SESSION_NOT_FOUND, { metadata: { httpStatus: a.status } }) : new s(N.SEND_MESSAGE_FAILED, { metadata: { httpStatus: a.status } });
		}
		let o = await a.json();
		return o.conversationId ||= this.conversationId, en(o);
	}
	async sendAlternativeAttachmentMessage(e, t) {
		if (this.logger.debug("sendAlternativeAttachmentMessage()", R.SEND_MESSAGE_CALLED, this.logContext), this.engagementStatus !== zt.ACTIVE) throw this.logger.error("sendAlternativeAttachmentMessage()", "Invalid dialog state: " + this.engagementStatus, this.logContext), new s(N.DIALOG_INVALID_STATE);
		let n = new FormData();
		n.append("attachment", e.attachment), n.append("text", e.text), n.append("correlationId", t);
		let r = await this.restController.send({
			methodType: U.SEND_MESSAGE_WITH_ATTACHMENT.requestType,
			url: U.SEND_MESSAGE_WITH_ATTACHMENT.path("messaging", this.config.integrationId, this.engagementId),
			isUrlFull: !1,
			requestBody: n
		});
		if (!r.ok) {
			let e = await r.json();
			throw It.isMaliciousContentDetectedResponse(r.status, e) ? new s(N.MALICIOUS_CONTENT_DETECTED, { metadata: { httpStatus: r.status } }) : H.isSessionNotFoundResponse(r.status, e) ? new s(N.SESSION_NOT_FOUND, { metadata: { httpStatus: r.status } }) : new s(N.SEND_MESSAGE_FAILED, { metadata: { httpStatus: r.status } });
		}
	}
}, W, G, K, nn, q, J, rn, an;
(function(e) {
	e.ENGAGEMENT_ERROR = "ENGAGEMENT_ERROR", e.EVENT_STREAM_CONNECTED = "EVENT_STREAM_CONNECTED", e.EVENT_STREAM_CLOSED = "EVENT_STREAM_CLOSED", e.EVENT_STREAM_FAILED = "EVENT_STREAM_FAILED", e.EVENT_STREAM_CONNECTING = "EVENT_STREAM_CONNECTING", e.MESSAGE_ARRIVED = "MESSAGE_ARRIVED", e.MESSAGE_DELIVERED = "MESSAGE_DELIVERED", e.INBOUND_TYPING_STARTED = "INBOUND_TYPING_STARTED", e.INBOUND_TYPING_STOPPED = "INBOUND_TYPING_STOPPED", e.INBOUND_TYPING_UPDATE = "INBOUND_TYPING_UPDATE";
})(W ||= {}), function(e) {
	e.MESSAGE = "MESSAGE", e.ENGAGEMENT_CREATED = "ENGAGEMENT_CREATED", e.ENGAGEMENT_ERROR = "ENGAGEMENT_ERROR", e.PARTICIPANT_ADDED = "PARTICIPANT_ADDED", e.PARTICIPANT_DISCONNECTED = "PARTICIPANT_DISCONNECTED", e.TYPING_STARTED = "TYPING_STARTED", e.TYPING_STOPPED = "TYPING_STOPPED";
}(G ||= {}), function(e) {
	e.UNAUTHORIZED = "UNAUTHORIZED", e.FORBIDDEN = "FORBIDDEN", e.SDK_SESSION_INVALID = "SDK_SESSION_INVALID", e.SERVER_ERROR = "SERVER_ERROR", e.SERVER_UNREACHABLE = "SERVER_UNREACHABLE", e.UNEXPECTED_ERROR = "UNEXPECTED_ERROR", e.RECONNECTION_TIMEOUT = "RECONNECTION_TIMEOUT";
}(K ||= {}), function(e) {
	e.STARTED = "STARTED", e.STOPPED = "STOPPED";
}(nn ||= {}), function(e) {
	e.TYPING = "TYPING", e.STOPPED = "STOPPED", e.BACKOFF = "BACKOFF", e.DEACTIVATED = "DEACTIVATED";
}(q ||= {}), function(e) {
	e.Success = "Success", e.InvalidRequest = "InvalidRequest", e.TokenIssues = "TokenIssues", e.CapabilityDisabled = "CapabilityDisabled", e.SessionNotFound = "SessionNotFound", e.EngagementNotFound = "EngagementNotFound", e.DialogNotFound = "DialogNotFound", e.IntegrationNotFound = "IntegrationNotFound", e.PathNotFound = "PathNotFound", e.TooManyRequests = "TooManyRequests", e.InternalServerError = "InternalServerError", e.BadGateway = "BadGateway", e.ServiceUnavailable = "ServiceUnavailable", e.NetworkError = "NetworkError", e.Unknown = "Unknown";
}(J ||= {}), function(e) {
	e.STARTED = "STARTED", e.STOPPED = "STOPPED";
}(rn ||= {}), function(e) {
	e[e.SENDING_START = 0] = "SENDING_START", e[e.WAITING = 1] = "WAITING", e[e.SENDING_STOP = 2] = "SENDING_STOP";
}(an ||= {});
var on = class e {
	static exponentialValues = [
		1,
		2,
		4,
		8,
		16,
		32,
		64
	];
	index = 0;
	maxBackoff;
	constructor(e) {
		this.maxBackoff = e;
	}
	next() {
		return this.index >= e.exponentialValues.length ? Math.min(this.maxBackoff, e.exponentialValues[e.exponentialValues.length - 1]) : this.maxBackoff < e.exponentialValues[this.index] ? this.maxBackoff : e.exponentialValues[this.index++];
	}
	nextMilliseconds() {
		return 60 * this.next() * 1e3;
	}
	reset() {
		this.index = 0;
	}
	get current() {
		return e.exponentialValues[this.index];
	}
	get currentMilliseconds() {
		return 60 * this.current * 1e3;
	}
}, sn = class {
	logger;
	restController;
	isSessionValid;
	backoffSequenceGenerator;
	eventProcessor;
	sessionId;
	integrationId;
	scheduledCheckInterval = 5500;
	maxTypingDelta = 3e3;
	maxBackoffDuration = 9e5;
	shutdownHandler;
	jwtStatusUpdateHandler;
	scheduledCheckerHandle = void 0;
	backoffTimerHandle = void 0;
	tokenValidityGate;
	lastTypingTime;
	engagementId;
	dialogId;
	currentState;
	eventDispatcher;
	featureConfiguration;
	scheduleTypingStop = !1;
	typingStatus = void 0;
	constructor(e, t, n, r, i, a, o, s) {
		this.sessionId = e, this.integrationId = t, this.currentState = q.STOPPED, this.isSessionValid = n, this.logger = r("OutboundTypingEventsController"), this.restController = i, this.featureConfiguration = s, this.tokenValidityGate = !0, this.lastTypingTime = 0, this.backoffSequenceGenerator = new on(this.maxBackoffDuration / 6e4), this.eventProcessor = a, this.eventDispatcher = o, this.shutdownHandler = this.eventDispatcher.addModuleEventHandler(y.SHUTDOWN, this.handleShutdown.bind(this)), this.jwtStatusUpdateHandler = this.eventDispatcher.addModuleEventHandler(y.JWT_STATE_CHANGED, this.handleJwtStatusUpdate.bind(this)), this.isCapableOutbound || (this.logger.debug("constructor()", "Deactivating as the outbound typing indicators are disabled.", this.logContext), this.deactivate());
	}
	get sessionValidityGate() {
		return this.isSessionValid();
	}
	get isCapableOutbound() {
		let e = this.featureConfiguration.getRawProperty(z.TypingIndicators.PropertyKeys.outbound);
		return this.featureConfiguration.isEnabled && e === "true";
	}
	get dialogValidityGate() {
		return this.engagementId !== void 0 && this.dialogId !== void 0;
	}
	get typingGate() {
		return this.isCapableOutbound && this.sessionValidityGate && !this.isDeactivated && this.tokenValidityGate && this.dialogValidityGate;
	}
	get isTyping() {
		return this.currentState === q.TYPING;
	}
	get isStopped() {
		return this.currentState === q.STOPPED;
	}
	get isDeactivated() {
		return this.currentState === q.DEACTIVATED;
	}
	get logContext() {
		return {
			sessionId: this.sessionId,
			engagementId: this.engagementId,
			dialogId: this.dialogId
		};
	}
	handleJwtStatusUpdate(e) {
		e.status === b.REINITIALIZED && (this.tokenValidityGate = !0);
	}
	handleShutdown() {
		this.logger.debug("handleShutdown()", "Deactivating as the Omni SDK is shutting down.", this.logContext), this.deactivate();
	}
	getDelta(e) {
		return e - this.lastTypingTime;
	}
	changeState(e) {
		if (this.currentState === q.DEACTIVATED) return void this.logger.debug("changeState()", "Ignoring state change request as the current state is DEACTIVATED.", {
			...this.logContext,
			requestedState: e
		});
		let t = this.currentState;
		this.currentState = e, this.logger.debug("changeState()", `State changed from ${t} to ${this.currentState}`, {
			...this.logContext,
			fromState: t,
			toState: this.currentState
		});
	}
	selfTransitionGate(e) {
		return this.currentState === e && (this.logger.debug("selfTransitionGate()", `State is already ${e}. Ignoring transition request.`, {
			...this.logContext,
			requestedState: e
		}), !0);
	}
	transitionToTyping() {
		this.selfTransitionGate(q.TYPING) || (this.changeState(q.TYPING), this.processTypingStarted());
	}
	transitionToStopped() {
		this.selfTransitionGate(q.STOPPED) || this.changeState(q.STOPPED);
	}
	transitionToBackoff() {
		this.selfTransitionGate(q.BACKOFF) || (this.changeState(q.BACKOFF), this.startBackoff());
	}
	isStillTyping() {
		if (!this.isTyping || !this.typingGate) return !1;
		let e = Date.now();
		return this.getDelta(e) < this.maxTypingDelta;
	}
	async processTypingStarted() {
		this.typingStatus = an.SENDING_START;
		let e = await this.sendTypingUpdate(rn.STARTED);
		if (this.currentState === q.TYPING) {
			if (e !== J.Success) return this.logger.debug("processTypingStarted()", `Typing [${rn.STARTED}] update failed with reason: ${e}`, this.logContext), this.scheduleTypingStop = !1, void this.handleTypingUpdateError(e);
			if (this.scheduleTypingStop) return this.logger.debug("processTypingStarted()", "Executing scheduled stop request.", this.logContext), this.processTypingStopped();
			this.typingStatus = an.WAITING, this.scheduleNextTypingCheck();
		} else this.logger.debug("processTypingStarted()", `Returning as the state is not ${q.TYPING}.`, this.logContext);
	}
	async processTypingStopped() {
		this.typingStatus = an.SENDING_STOP, this.clearNextTypingCheck();
		let e = await this.sendTypingUpdate(rn.STOPPED);
		if (this.currentState === q.TYPING) {
			if (this.scheduleTypingStop = !1, e !== J.Success) return this.logger.debug("processTypingStopped()", `Typing [${rn.STOPPED}] update failed with reason: ${e}`, this.logContext), void this.handleTypingUpdateError(e);
			this.typingStatus = void 0, this.transitionToStopped();
		} else this.logger.debug("processTypingStopped()", `Returning as the state is not ${q.TYPING}.`, this.logContext);
	}
	handleTypingUpdateError(e) {
		switch (this.typingStatus = void 0, e) {
			case J.Success: break;
			case J.InvalidRequest:
			case J.CapabilityDisabled:
				this.logger.warn("handleTypingUpdateError()", "Deactivating outbound typing indicators", {
					...this.logContext,
					reason: e
				}), this.deactivate();
				break;
			case J.TokenIssues:
				this.logger.warn("handleTypingUpdateError()", "Typing update rejected due to token issues, stopping until token is reinitialized", this.logContext), this.tokenValidityGate = !1, this.transitionToStopped();
				break;
			case J.EngagementNotFound:
			case J.DialogNotFound:
				this.logger.warn("handleTypingUpdateError()", "Engagement or dialog no longer valid, clearing typing indicator state", {
					...this.logContext,
					reason: e
				}), this.clearEngagementDetails(), this.transitionToStopped();
				break;
			case J.SessionNotFound:
			case J.IntegrationNotFound:
				this.logger.warn("handleTypingUpdateError()", "Session or integration not found, dispatching session error", {
					...this.logContext,
					reason: e
				}), this.eventProcessor.processEvents([{
					type: y.SESSION_ERROR,
					event: {
						sessionId: this.sessionId,
						eventDate: /* @__PURE__ */ new Date(),
						errorReason: m.SESSION_NOT_FOUND
					}
				}]);
				break;
			case J.PathNotFound:
			case J.TooManyRequests:
			case J.InternalServerError:
			case J.BadGateway:
			case J.ServiceUnavailable:
			case J.NetworkError:
			case J.Unknown: this.logger.warn("handleTypingUpdateError()", "Entering backoff after typing update failure", {
				...this.logContext,
				reason: e
			}), this.transitionToBackoff();
		}
	}
	checkTypingUpdate() {
		if (!this.isSessionValid()) return this.logger.debug("checkTypingUpdate()", "Deactivating as session is not valid.", this.logContext), void this.deactivate();
		this.isStillTyping() ? this.scheduleNextTypingCheck() : (this.logger.debug("checkTypingUpdate()", "User typing has stopped", this.logContext), this.processTypingStopped());
	}
	scheduleNextTypingCheck() {
		this.isTyping && (this.scheduledCheckerHandle &&= (clearTimeout(this.scheduledCheckerHandle), void 0), this.scheduledCheckerHandle = setTimeout((() => {
			this.checkTypingUpdate();
		}), this.scheduledCheckInterval));
	}
	clearNextTypingCheck() {
		this.scheduledCheckerHandle &&= (clearTimeout(this.scheduledCheckerHandle), void 0), this.logger.debug("clearNextTypingCheck()", "Cleared typing check.", this.logContext);
	}
	startBackoff() {
		let e = this.backoffSequenceGenerator.nextMilliseconds();
		this.backoffTimerHandle = setTimeout((() => {
			this.backoffTimerHandle = void 0, this.transitionToStopped();
		}), e), this.logger.debug("startBackoff()", "Backoff timer started.", {
			...this.logContext,
			backoffDurationMs: e
		});
	}
	clearBackoff() {
		this.backoffTimerHandle &&= (clearTimeout(this.backoffTimerHandle), void 0), this.logger.debug("clearBackoff()", "Cleared backoff timer.", this.logContext);
	}
	async sendTypingUpdate(e) {
		if (this.logger.debug("sendTypingUpdate()", `Sending typing update: ${e}`, {
			...this.logContext,
			typingState: e
		}), this.engagementId === void 0) return J.EngagementNotFound;
		if (this.dialogId === void 0) return J.DialogNotFound;
		try {
			let t = await this.restController.send({
				methodType: U.SEND_TYPING_INDICATOR.requestType,
				url: U.SEND_TYPING_INDICATOR.path(this.integrationId, this.engagementId),
				isUrlFull: !1,
				requestBody: JSON.stringify({
					dialogId: this.dialogId,
					sessionId: this.sessionId,
					state: e
				})
			});
			if (!t.ok) switch (t.status) {
				case 400: return J.InvalidRequest;
				case 401: return J.TokenIssues;
				case 403: return J.CapabilityDisabled;
				case 404: switch ((await t.json()).detail) {
					case R.SESSION_NOT_FOUND: return J.SessionNotFound;
					case R.ENGAGEMENT_NOT_FOUND: return J.EngagementNotFound;
					case R.DIALOG_NOT_FOUND: return J.DialogNotFound;
					case R.PATH_NOT_FOUND: return J.PathNotFound;
					case R.INTEGRATION_NOT_FOUND: return J.IntegrationNotFound;
					default: return J.Unknown;
				}
				case 429: return J.TooManyRequests;
				case 500: return J.InternalServerError;
				case 502: return J.BadGateway;
				case 503: return J.ServiceUnavailable;
				default: return J.Unknown;
			}
			return J.Success;
		} catch (e) {
			return this.logger.error("sendTypingUpdate()", "Unexpected error occurred while sending typing update", this.logContext, e), e instanceof TypeError ? J.NetworkError : J.Unknown;
		}
	}
	deactivate() {
		this.selfTransitionGate(q.DEACTIVATED) || (this.changeState(q.DEACTIVATED), this.eventDispatcher.removeModuleEventHandler(y.SHUTDOWN, this.shutdownHandler), this.eventDispatcher.removeModuleEventHandler(y.JWT_STATE_CHANGED, this.jwtStatusUpdateHandler), this.typingStatus = void 0, this.clearBackoff(), this.clearNextTypingCheck(), this.scheduleTypingStop = !1, this.backoffSequenceGenerator.reset());
	}
	get state() {
		return this.currentState;
	}
	setEngagementDetails(e, t) {
		this.engagementId = e, this.dialogId = t;
	}
	clearEngagementDetails() {
		this.engagementId = void 0, this.dialogId = void 0;
	}
	markTypingUpdate() {
		this.lastTypingTime = Date.now(), this.typingGate && (this.scheduleTypingStop &&= (this.logger.debug("markTypingUpdate()", "Clearing scheduled stop request.", this.logContext), !1), this.isStopped && this.transitionToTyping());
	}
	clearTyping() {
		if (this.isTyping) switch (this.typingStatus) {
			case an.SENDING_START:
				this.logger.debug("clearTyping()", "Typing update API call in progress, scheduling typing stop request to commence once API call is finished.", this.logContext), this.scheduleTypingStop = !0;
				break;
			case an.WAITING:
				this.logger.debug("clearTyping()", "Sending typing stop request now", this.logContext), this.processTypingStopped();
				break;
			default: this.logger.debug("clearTyping()", `Ignoring clearTyping() as typing status is ${this.typingStatus}`, {
				...this.logContext,
				typingStatus: this.typingStatus
			});
		}
	}
}, cn = {
	name: z.TypingIndicators.name,
	properties: {
		[z.TypingIndicators.PropertyKeys.inbound]: "false",
		[z.TypingIndicators.PropertyKeys.outbound]: "false"
	},
	configurations: []
}, ln = class {
	participantId;
	countdownDuration;
	countdownCompletionHandler;
	handle;
	constructor(e, t, n) {
		this.participantId = e, this.countdownDuration = t, this.countdownCompletionHandler = n;
	}
	start() {
		this.handle ||= setTimeout((() => {
			this.countdownCompletionHandler(this.participantId), this.handle = void 0;
		}), this.countdownDuration);
	}
	stop() {
		this.handle &&= (clearTimeout(this.handle), void 0);
	}
	restart() {
		this.stop(), this.start();
	}
	get isRunning() {
		return !!this.handle;
	}
}, un = class {
	eventDispatcher;
	eventProcessor;
	isSessionValid;
	participantTypingCountdowns = /* @__PURE__ */ new Map();
	conversationId;
	sessionId;
	participantRemovedHandler;
	typingEventHandler;
	shutdownHandler;
	engagementErrorHandler;
	countdownDuration = 15e3;
	logger;
	participantRegistry;
	featureConfiguration;
	constructor(e, t, n, r, i, a, o, s) {
		this.eventDispatcher = r, this.eventProcessor = i, this.isSessionValid = a, this.conversationId = t, this.sessionId = e, this.participantRegistry = s, this.featureConfiguration = n, this.logger = o("InboundTypingEventsController"), this.participantRemovedHandler = this.eventDispatcher.addModuleEventHandler(y.PARTICIPANT_DISCONNECTED, this.handleParticipantRemoved.bind(this), this.conversationId), this.typingEventHandler = this.eventDispatcher.addModuleEventHandler(W.INBOUND_TYPING_UPDATE, this.handleTypingUpdate.bind(this), this.conversationId), this.shutdownHandler = this.eventDispatcher.addModuleEventHandler(y.SHUTDOWN, this.handleShutdown.bind(this)), this.engagementErrorHandler = this.eventDispatcher.addModuleEventHandler(W.ENGAGEMENT_ERROR, this.handleEngagementError.bind(this), this.conversationId);
	}
	validateSession() {
		if (!this.isSessionValid()) throw new s(N.SDK_NOT_INITIALIZED);
	}
	get logContext() {
		return {
			sessionId: this.sessionId,
			conversationId: this.conversationId
		};
	}
	cleanup() {
		this.stopAllCountdowns(), this.eventDispatcher.removeModuleEventHandler(y.PARTICIPANT_DISCONNECTED, this.participantRemovedHandler, this.conversationId), this.eventDispatcher.removeModuleEventHandler(W.INBOUND_TYPING_UPDATE, this.typingEventHandler, this.conversationId), this.eventDispatcher.removeModuleEventHandler(y.SHUTDOWN, this.shutdownHandler), this.eventDispatcher.removeModuleEventHandler(W.ENGAGEMENT_ERROR, this.engagementErrorHandler, this.conversationId), this.participantTypingCountdowns.clear(), this.logger.debug("cleanup()", "Cleaned up InboundTypingEventController", this.logContext);
	}
	get isCapableInbound() {
		let e = this.featureConfiguration.getRawProperty(z.TypingIndicators.PropertyKeys.inbound);
		return this.featureConfiguration.isEnabled && e === "true";
	}
	stopAllCountdowns() {
		for (let e of this.participantTypingCountdowns.values()) e.stop();
	}
	permitOrLog(e) {
		return this.isSessionValid() ? !!this.isCapableInbound || (this.logger.debug(e, "Ignoring typing update as inbound typing indicators are disabled", this.logContext), !1) : (this.logger.debug(e, "Ignoring typing update as Session is invalid", this.logContext), !1);
	}
	handleTypingUpdate(e) {
		if (!this.permitOrLog("handleTypingUpdate()")) return;
		let t = e.participant;
		if (!this.participantRegistry.hasParticipant(t.participantId)) return void this.logger.debug("handleTypingUpdate()", `Ignoring typing update as Participant(${t.participantId}) not found`, {
			...this.logContext,
			participantId: t.participantId
		});
		if (t.participantType === h.CUSTOMER) return;
		let n = this.participantTypingCountdowns.get(t.participantId);
		switch (e.updateType) {
			case nn.STARTED:
				n ? n.isRunning ? n.restart() : (this.participantTypingCountdowns.get(t.participantId).start(), this.dispatchTypingStarted(t)) : (this.logger.debug("handleTypingUpdate()", `Created countdown for Participant (${t.participantId})`, {
					...this.logContext,
					participantId: t.participantId
				}), this.createCountdownForParticipant(t.participantId).start(), this.dispatchTypingStarted(t));
				break;
			case nn.STOPPED:
				n?.isRunning && (n.stop(), this.dispatchTypingStopped(t));
				break;
			default: this.logger.debug("handleTypingUpdate()", `Ignoring typing update of unknown type ${e.updateType} for Participant (${t.participantId})`, {
				...this.logContext,
				participantId: t.participantId,
				updateType: e.updateType
			});
		}
	}
	handleParticipantRemoved(e) {
		this.permitOrLog("handleParticipantRemoved()") && this.participantTypingCountdowns.has(e.participant.participantId) && (this.participantTypingCountdowns.get(e.participant.participantId).isRunning && (this.participantTypingCountdowns.get(e.participant.participantId).stop(), this.dispatchTypingStopped(e.participant)), this.participantTypingCountdowns.get(e.participant.participantId).stop(), this.participantTypingCountdowns.delete(e.participant.participantId), this.logger.debug("handleParticipantRemoved()", `Removing countdown for Participant (${e.participant.participantId})`, {
			...this.logContext,
			participantId: e.participant.participantId
		}));
	}
	handleParticipantTypingCountdown(e) {
		if (!this.permitOrLog("handleParticipantTypingCountdown()")) return;
		let t = this.participantRegistry.getParticipant(e);
		t ? (this.logger.debug("handleParticipantTypingCountdown()", `Participant (${e}) has stopped typing.`, {
			...this.logContext,
			participantId: e
		}), this.dispatchTypingStopped(t)) : this.logger.debug("handleParticipantTypingCountdown()", `Ignoring event as Participant (${e}) not found in registry.`, {
			...this.logContext,
			participantId: e
		});
	}
	createCountdownForParticipant(e) {
		let t = new ln(e, this.countdownDuration, this.handleParticipantTypingCountdown.bind(this));
		return this.participantTypingCountdowns.set(e, t), t;
	}
	dispatchTypingStarted(e) {
		this.permitOrLog("dispatchTypingStarted()") && this.eventProcessor.processEvents([{
			type: W.INBOUND_TYPING_STARTED,
			event: {
				conversationId: this.conversationId,
				participant: e,
				eventDate: /* @__PURE__ */ new Date()
			}
		}]);
	}
	dispatchTypingStopped(e) {
		this.permitOrLog("dispatchTypingStopped()") && this.eventProcessor.processEvents([{
			type: W.INBOUND_TYPING_STOPPED,
			event: {
				conversationId: this.conversationId,
				participant: e,
				eventDate: /* @__PURE__ */ new Date()
			}
		}]);
	}
	handleEngagementError() {
		if (!this.permitOrLog("handleEngagementError()")) return;
		this.logger.debug("handleEngagementError()", "Received Engagement Error, stopping all running countdowns", this.logContext);
		let e = Array.from(this.participantTypingCountdowns.values()).filter(((e) => e.isRunning));
		this.stopAllCountdowns();
		for (let t of e) {
			let e = this.participantRegistry.getParticipant(t.participantId);
			e ? this.dispatchTypingStopped(e) : this.logger.debug("handleEngagementError()", `Participant (${t.participantId}) not found in registry, ignoring participant.`, {
				...this.logContext,
				participantId: t.participantId
			});
		}
	}
	handleShutdown() {
		this.cleanup(), this.logger.debug("handleShutdown()", "Stopped inbound typing indicators as the Omni SDK is shutting down", this.logContext);
	}
}, dn = class {
	static officialName = z.TypingIndicators.name;
	isSessionValid;
	conversationId;
	sessionId;
	logger;
	inboundTypingEventsController;
	outboundTypingEventsController;
	featureConfiguration;
	constructor(e, t, n, r, i, a, o, s, c, l) {
		this.isSessionValid = a, this.conversationId = t, this.sessionId = e, this.logger = o("TypingIndicatorsController"), n.hasSubFeature(z.TypingIndicators.name) || this.logger.debug("constructor()", "Typing indicators configuration not found, falling back to default configuration.", this.logContext), this.featureConfiguration = n.getSubFeatureOrDefault(z.TypingIndicators.name, cn), this.inboundTypingEventsController = new un(e, t, this.featureConfiguration, r, i, a, o, s), this.outboundTypingEventsController = new sn(e, l.integrationId, a, o, c, i, r, this.featureConfiguration), this.logger.debug("constructor()", "Typing indicators feature status", {
			...this.logContext,
			enabledInbound: this.isCapableInbound,
			enabledOutbound: this.isCapableOutbound
		});
	}
	validateSession() {
		if (!this.isSessionValid()) throw new s(N.SDK_NOT_INITIALIZED);
	}
	get logContext() {
		return {
			sessionId: this.sessionId,
			conversationId: this.conversationId
		};
	}
	get isCapableInbound() {
		return this.inboundTypingEventsController.isCapableInbound;
	}
	get isCapableOutbound() {
		return this.outboundTypingEventsController.isCapableOutbound;
	}
	notifyUserTyping() {
		this.validateSession(), this.outboundTypingEventsController.markTypingUpdate();
	}
	setEngagementDetails(e, t) {
		this.outboundTypingEventsController.setEngagementDetails(e, t);
	}
	clearEngagementDetails() {
		this.outboundTypingEventsController.clearEngagementDetails();
	}
	notifySendMessageRequest() {
		this.outboundTypingEventsController.clearTyping();
	}
	deactivate() {
		this.logger.debug("deactivate()", "Deactivating typing indicators feature", this.logContext), this.outboundTypingEventsController.deactivate();
	}
}, fn = class {
	queue = [];
	isProcessing = !1;
	restController;
	config;
	logger;
	constructor(e, t, n) {
		this.restController = e, this.config = t, this.logger = n("MessageDeliveryAcknowledger");
	}
	add(e) {
		if (Array.isArray(e)) {
			if (e.length === 0) return;
			this.queue.push(...e);
		} else this.queue.push(e);
		this.isProcessing || this.processQueue();
	}
	processQueue() {
		this.isProcessing = !0, this.runLoop();
	}
	async runLoop() {
		try {
			for (; this.queue.length > 0;) {
				let e = this.queue.splice(0, R.DELIVERY_ACK_BATCH_SIZE);
				await this.sendBatch(e);
			}
		} catch (e) {
			this.logger.error("runLoop()", "Unexpected error in delivery ack loop", { remainingQueueLength: this.queue.length }, e);
		} finally {
			this.isProcessing = !1;
		}
	}
	sleep(e) {
		return new Promise(((t) => setTimeout(t, e)));
	}
	async sendBatch(e) {
		let t = (/* @__PURE__ */ new Date()).toISOString(), n = JSON.stringify({ items: e.map(((e) => ({
			messageId: e,
			status: gt.DELIVERED,
			statusTimestamp: t
		}))) });
		for (let t = 1; t <= R.DELIVERY_ACK_RETRY_ATTEMPTS; t++) {
			this.logger.debug("sendBatch()", R.SEND_MESSAGE_STATUS_CALLED, {
				messageIds: e,
				attempt: t
			});
			try {
				let r = await this.restController.send({
					methodType: U.SEND_MESSAGE_STATUS.requestType,
					url: U.SEND_MESSAGE_STATUS.path(this.config.integrationId),
					requestBody: n,
					isUrlFull: !1
				});
				if (r.ok) return void this.logger.debug("sendBatch()", R.SEND_MESSAGE_STATUS_SUCCESSFUL, {
					messageIds: e,
					attempt: t
				});
				this.logger.warn("sendBatch()", N.SEND_MESSAGE_STATUS_FAILED.message, {
					messageIds: e,
					attempt: t,
					httpStatus: r.status
				});
			} catch (n) {
				this.logger.warn("sendBatch()", N.SEND_MESSAGE_STATUS_FAILED.message, {
					messageIds: e,
					attempt: t
				}, n);
			}
			t < R.DELIVERY_ACK_RETRY_ATTEMPTS && await this.sleep(R.DELIVERY_ACK_RETRY_DELAY_MS);
		}
		this.logger.error("sendBatch()", "Delivery ack retries exhausted, dropping message batch", {
			messageIds: e,
			reason: "exhausted retries, batch dropped"
		});
	}
}, pn = (e) => {
	if (!e.message || !e.participant) throw new s(N.INVALID_MESSAGE_EVENT);
	return {
		conversationId: e.conversationId,
		eventDate: new Date(e.eventDate),
		messageId: e.message.messageId,
		parentMessageId: e.message.parentMessageId,
		_messageIndex: e.message.messageIndex,
		receivedAt: e.message?.receivedAt ? new Date(e.message.receivedAt) : /* @__PURE__ */ new Date(),
		lastUpdatedAt: e.message?.lastUpdatedAt ? new Date(e.message.lastUpdatedAt) : /* @__PURE__ */ new Date(),
		body: Ut(e.message.body),
		senderParticipant: S(e.participant.participantId, e.participant.participantType, x.MESSAGING, e.participant.displayName),
		attachments: e.message.attachments?.map(((e) => Xt(e))),
		_correlationId: e.message.correlationId
	};
}, mn = (e) => yn(e), hn = (e) => yn(e), gn = (e) => ({
	eventDate: new Date(e.eventDate),
	type: e.error.type,
	title: e.error.title,
	detail: e.error.detail
}), _n = (e) => {
	if (!e.participant) throw new s(N.TYPING_UPDATE_PARTICIPANT_MISSING);
	return {
		conversationId: e.conversationId,
		eventDate: new Date(e.eventDate),
		participant: S(e.participant.participantId, e.participant.participantType, x.MESSAGING, e.participant.displayName),
		updateType: vn(e.eventType)
	};
};
function vn(e) {
	switch (e) {
		case G.TYPING_STARTED: return nn.STARTED;
		case G.TYPING_STOPPED: return nn.STOPPED;
		default: throw new s(N.UNKNOWN_TYPING_UPDATE_TYPE);
	}
}
function yn(e) {
	if (!e.participant) throw new s(N.PARTICIPANT_EVENT_PARTICIPANT_MISSING);
	return {
		conversationId: e.conversationId,
		eventDate: new Date(e.eventDate),
		participant: S(e.participant.participantId, e.participant.participantType, x.MESSAGING, e.participant.displayName),
		channel: x.MESSAGING
	};
}
var bn = class {
	logger;
	eventDispatcher;
	deliveryAckQueue;
	isDeliveryNotificationEnabled;
	constructor(e, t, n, r) {
		this.logger = e("MessagingEventProcessor"), this.eventDispatcher = t, this.deliveryAckQueue = n, this.isDeliveryNotificationEnabled = r;
	}
	async processEvents(e) {
		this.isDeliveryNotificationEnabled() && this.deliveryAckQueue.add(e.filter(((e) => e.type === G.MESSAGE && (e.event.participant?.participantType === h.AGENT || e.event.participant?.participantType === h.SYSTEM) && e.event.message?.messageId)).map(((e) => e.event.message.messageId)));
		for (let t of e) switch (t.type) {
			case G.MESSAGE:
				await this.processAndDispatchMessageEvent(t.event);
				break;
			case G.PARTICIPANT_ADDED:
				await this.processAndDispatchParticipantAddedEvent(t.event);
				break;
			case G.PARTICIPANT_DISCONNECTED:
				await this.processAndDispatchParticipantDisconnectedEvent(t.event);
				break;
			case G.ENGAGEMENT_ERROR:
				this.processAndDispatchEngagementErrorEvent(t.event);
				break;
			case G.ENGAGEMENT_CREATED: break;
			case G.TYPING_STARTED:
			case G.TYPING_STOPPED:
				this.processAndDispatchTypingEvent(t.event);
				break;
			case y.SESSION_ERROR:
			case W.EVENT_STREAM_CONNECTING:
			case W.EVENT_STREAM_CONNECTED:
			case W.EVENT_STREAM_FAILED:
			case W.EVENT_STREAM_CLOSED:
				this.eventDispatcher.invokeEventHandler(t.type, t.event);
				break;
			case y.PARTICIPANT_SYNC: {
				let e = t.event.conversationId;
				this.eventDispatcher.invokeEventHandler(t.type, t.event, e);
				break;
			}
			case y.PARTICIPANT_LIST_UPDATE: {
				let e = t.event.conversationId;
				this.eventDispatcher.invokeEventHandler(t.type, t.event, e);
				break;
			}
			case W.MESSAGE_ARRIVED:
			case W.INBOUND_TYPING_STARTED:
			case W.INBOUND_TYPING_STOPPED: {
				let e = t.event.conversationId;
				this.eventDispatcher.invokeEventHandler(t.type, t.event, e);
				break;
			}
			default: this.logger.warn("processEvents()", "Unknown event type", {
				eventType: t.type,
				namespace: t.namespace
			});
		}
	}
	async processAndDispatchMessageEvent(e) {
		let t = pn(e);
		e.participant.participantType == h.CUSTOMER ? await this.eventDispatcher.invokeEventHandler(W.MESSAGE_DELIVERED, t, t.conversationId) : await this.eventDispatcher.invokeEventHandler(W.MESSAGE_ARRIVED, t, t.conversationId);
	}
	async processAndDispatchParticipantAddedEvent(e) {
		let t = mn(e);
		await this.eventDispatcher.invokeEventHandler(y.PARTICIPANT_ADDED, t, t.conversationId);
	}
	async processAndDispatchParticipantDisconnectedEvent(e) {
		let t = hn(e);
		await this.eventDispatcher.invokeEventHandler(y.PARTICIPANT_DISCONNECTED, t, t.conversationId);
	}
	processAndDispatchEngagementErrorEvent(e) {
		let t = gn(e);
		this.eventDispatcher.invokeEventHandler(W.ENGAGEMENT_ERROR, t, t.conversationId);
	}
	processAndDispatchTypingEvent(e) {
		let t = _n(e);
		this.eventDispatcher.invokeEventHandler(W.INBOUND_TYPING_UPDATE, t, t.conversationId);
	}
}, xn, Y;
(function(e) {
	e.STARTED = "STARTED", e.PAUSED = "PAUSED", e.STOPPED = "STOPPED", e.FAILED = "FAILED";
})(xn ||= {}), function(e) {
	e[e.Closed = 0] = "Closed", e[e.Connecting = 1] = "Connecting", e[e.Connected = 2] = "Connected", e[e.Retry = 3] = "Retry", e[e.Paused = 4] = "Paused", e[e.Failed = 5] = "Failed";
}(Y ||= {});
var Sn = class {
	restController;
	config;
	logger;
	dispatchedEventIds;
	latestEventId;
	state;
	currentDelay;
	nextDelay;
	clearSyntheticDelay;
	sessionId;
	disconnectionCheckCount;
	maxRequestTimeout;
	messagingEventProcessor;
	reconnectionTimer;
	isManualRetryInProgress;
	missingEventsManager;
	nonAcknowledgeableEvents = [G.TYPING_STARTED, G.TYPING_STOPPED];
	constructor(e, t, n, r, i, a) {
		this.sessionId = e, this.restController = t, this.config = n, this.dispatchedEventIds = /* @__PURE__ */ new Set(), this.latestEventId = null, this.state = new Cn(), this.currentDelay = 1, this.nextDelay = 1, this.disconnectionCheckCount = 3, this.maxRequestTimeout = 4e4, this.messagingEventProcessor = i, this.missingEventsManager = a, this.logger = r("LongPollingReceiver"), this.reconnectionTimer = new v(ht.Reconnection, R.RECONNECTION_TIMEOUT, this.handleReconnectionTimeout.bind(this)), this.isManualRetryInProgress = !1;
	}
	handleReconnectionTimeout() {
		let e = this.state.isClosed;
		this.state.toFailed(), e || this.logger.warn("handleReconnectionTimeout()", "Long polling state changed to Failed", { sessionId: this.sessionId }), this.clearSyntheticDelay?.(), this.dispatchEventStreamFailed(K.RECONNECTION_TIMEOUT);
	}
	getStatus() {
		switch (this.state.getState()) {
			case Y.Closed: return xn.STOPPED;
			case Y.Connecting:
			case Y.Connected: return xn.STARTED;
			case Y.Retry:
			case Y.Failed: return xn.FAILED;
			case Y.Paused: return xn.PAUSED;
		}
	}
	async start() {
		this.state.isClosed && (this.logger.debug("start()", R.LONG_POLLING_STARTING, { sessionId: this.sessionId }), this.dispatchedEventIds.clear(), this.currentDelay = 1, this.nextDelay = 1, this.state.toConnecting(), this.dispatchEventStreamConnecting(), this.poll());
	}
	pause() {
		(this.state.isRetry || this.state.isFailed || this.state.isConnecting || this.state.isConnected) && (this.state.toPaused(), this.logger.debug("pause()", R.LONG_POLLING_PAUSED, { sessionId: this.sessionId }));
	}
	stop() {
		let e = this.state.getState();
		this.state.toClosed(), this.dispatchedEventIds.clear(), this.currentDelay = 1, this.nextDelay = 1, this.clearSyntheticDelay?.(), this.reconnectionTimer.isRunning && this.reconnectionTimer.stop(), this.missingEventsManager.clean(), this.isManualRetryInProgress = !1, e !== Y.Closed && (this.logger.debug("stop()", R.LONG_POLLING_STOPPED, { sessionId: this.sessionId }), this.dispatchEventStreamClosed());
	}
	async resume() {
		this.state.isPaused && (this.logger.debug("resume()", R.LONG_POLLING_RESUMING, { sessionId: this.sessionId }), this.state.toConnecting(), this.poll());
	}
	handleDisconnection() {
		(this.state.isConnecting || this.state.isConnected) && (this.state.toRetry(), this.logger.info("handleDisconnection()", "Long polling state changed to Retry", { sessionId: this.sessionId }), this.reconnectionTimer.start());
	}
	handlePositiveReconnection() {
		(this.state.isRetry || this.state.isFailed) && (this.state.toConnected(), this.logger.info("handlePositiveReconnection()", "Long polling state changed to Connected", { sessionId: this.sessionId }), this.reconnectionTimer.isRunning && this.reconnectionTimer.stop(), this.resetBackoffMechanism());
	}
	handleNegativeReconnection() {
		(this.state.isRetry || this.state.isFailed) && (this.state.toPaused(), this.logger.warn("handleNegativeReconnection()", "Long polling state changed to Paused", { sessionId: this.sessionId }), this.reconnectionTimer.isRunning && this.reconnectionTimer.stop(), this.resetBackoffMechanism());
	}
	get pollingAllowed() {
		return this.state.isConnecting || this.state.isRetry || this.state.isConnected;
	}
	getDelay() {
		let e = this.currentDelay + this.nextDelay;
		return this.currentDelay = this.nextDelay, this.nextDelay = e, this.currentDelay;
	}
	async syntheticDelay() {
		let e = 1e3 * (this.getDelay() + Math.random());
		return this.logger.info("syntheticDelay()", "Scheduling reconnect backoff", {
			sessionId: this.sessionId,
			retryDelayMs: Math.round(e),
			retryAfterSeconds: this.nextDelay
		}), new Promise(((t) => {
			let n = setTimeout((() => {
				t(), this.clearSyntheticDelay = void 0;
			}), e);
			this.clearSyntheticDelay = () => {
				globalThis.clearTimeout(n), t();
			};
		}));
	}
	resetBackoffMechanism() {
		this.currentDelay = 1, this.nextDelay = 1;
	}
	async checkDisconnection() {
		for (let e = 0; e < this.disconnectionCheckCount; e++) try {
			let e = await this.restController.send({
				methodType: D.GET,
				url: this.prepareURL(),
				isUrlFull: !0
			});
			if (e !== void 0 && e.status === 200) return !1;
			let t = await e.json();
			if (e !== void 0 && H.isSessionNotFoundResponse(e.status, t) && H.dispatchSessionErrorEvent(this.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger), e !== void 0 && (e.status === 401 || e.status === 403)) return !1;
		} catch (e) {
			this.logger.warn("checkDisconnection()", "Error occurred in connecting, retrying", { sessionId: this.sessionId }, e);
			continue;
		}
		return !0;
	}
	dispatchEventStreamConnecting() {
		this.logger.debug("dispatchEventStreamConnecting()", R.EVENT_STREAM_CONNECTING, { sessionId: this.sessionId }), this.messagingEventProcessor.processEvents([{
			type: W.EVENT_STREAM_CONNECTING,
			event: {
				eventDate: /* @__PURE__ */ new Date(),
				sessionId: this.sessionId
			}
		}]);
	}
	dispatchEventStreamConnected() {
		this.logger.debug("dispatchEventStreamConnected()", R.EVENT_STREAM_CONNECTED, { sessionId: this.sessionId }), this.messagingEventProcessor.processEvents([{
			type: W.EVENT_STREAM_CONNECTED,
			event: {
				eventDate: /* @__PURE__ */ new Date(),
				sessionId: this.sessionId
			}
		}]);
	}
	dispatchEventStreamFailed(e, t = !1) {
		this.logger.warn("dispatchEventStreamFailed()", R.EVENT_STREAM_FAILED, {
			sessionId: this.sessionId,
			reason: e,
			afterManualRetry: t
		});
		let n = {
			reason: e,
			eventDate: /* @__PURE__ */ new Date(),
			sessionId: this.sessionId,
			message: ""
		};
		switch (e) {
			case K.FORBIDDEN:
			case K.UNAUTHORIZED:
				n.message = N.JWT_INVALID.message;
				break;
			case K.RECONNECTION_TIMEOUT:
				n.message = N.SERVER_UNREACHABLE.message;
				break;
			case K.SDK_SESSION_INVALID:
				n.message = N.SESSION_NOT_FOUND.message;
				break;
			case K.SERVER_ERROR:
			case K.SERVER_UNREACHABLE:
			case K.UNEXPECTED_ERROR: n.message = N.SERVER_RESPONDED_UNEXPECTEDLY.message, t || (n.retryAfter = this.nextDelay);
		}
		this.messagingEventProcessor.processEvents([{
			type: W.EVENT_STREAM_FAILED,
			event: n
		}]);
	}
	dispatchEventStreamClosed() {
		this.logger.debug("dispatchEventStreamClosed()", R.EVENT_STREAM_CLOSED, { sessionId: this.sessionId }), this.messagingEventProcessor.processEvents([{
			type: W.EVENT_STREAM_CLOSED,
			event: {
				sessionId: this.sessionId,
				eventDate: /* @__PURE__ */ new Date()
			}
		}]);
	}
	async poll() {
		if (this.state.isRetry && await this.syntheticDelay(), this.state.isRetry && this.dispatchEventStreamConnecting(), this.pollingAllowed) return this.restController.send({
			methodType: D.GET,
			url: this.prepareURL(),
			isUrlFull: !0,
			maxRequestTimeout: this.maxRequestTimeout
		}).then((async (e) => {
			await this.processResponse(e);
		})).catch(((e) => {
			this.processError(e);
		})).finally((() => {
			this.poll();
		}));
	}
	async processResponse(e) {
		return this.state.isRetry ? this.processRetryResponse(e) : this.state.isConnecting || this.state.isConnected ? this.processNormalResponse(e) : void 0;
	}
	async processRetryResponse(e) {
		switch (e.status) {
			case 200:
				this.handlePositiveReconnection(), this.logger.debug("processRetryResponse()", "Reconnected", { sessionId: this.sessionId }), this.dispatchEventStreamConnected();
				break;
			case 401:
				this.handleNegativeReconnection(), this.logger.debug("processRetryResponse()", "Reconnected with JWT issue", { sessionId: this.sessionId }), this.dispatchEventStreamFailed(K.UNAUTHORIZED);
				break;
			case 403:
				this.handleNegativeReconnection(), this.logger.debug("processRetryResponse()", "Reconnection failed due to JWT issue", { sessionId: this.sessionId }), this.dispatchEventStreamFailed(K.FORBIDDEN);
				break;
			case 404:
				(await e.json()).detail === R.SESSION_NOT_FOUND ? (this.stop(), H.dispatchSessionErrorEvent(this.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger), this.dispatchEventStreamFailed(K.SDK_SESSION_INVALID)) : this.dispatchEventStreamFailed(K.SERVER_UNREACHABLE);
				break;
			default: this.logger.error("processRetryResponse()", "Unexpected response from server", {
				status: e.status,
				sessionId: this.sessionId
			}), this.dispatchEventStreamFailed(K.SERVER_UNREACHABLE);
		}
	}
	async processNormalResponse(e) {
		switch (e.status) {
			case 200: {
				this.state.isConnecting && (this.state.toConnected(), this.dispatchEventStreamConnected());
				let t = await e.json();
				this.processPositiveResponse(t);
				break;
			}
			case 401:
				this.pause(), this.dispatchEventStreamFailed(K.UNAUTHORIZED);
				break;
			case 403:
				this.pause(), this.dispatchEventStreamFailed(K.FORBIDDEN);
				break;
			case 500:
				await this.checkDisconnection() && (this.dispatchEventStreamFailed(K.SERVER_ERROR), this.handleDisconnection());
				break;
			case 501:
				await this.checkDisconnection() && (this.dispatchEventStreamFailed(K.SERVER_UNREACHABLE), this.handleDisconnection());
				break;
			default:
				if (this.logger.error("processNormalResponse()", "Unexpected response from server", {
					status: e.status,
					sessionId: this.sessionId
				}), e.status === 404 && (await e.json()).detail === R.SESSION_NOT_FOUND) {
					this.stop(), H.dispatchSessionErrorEvent(this.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger);
					break;
				}
				await this.checkDisconnection() && (this.dispatchEventStreamFailed(K.UNEXPECTED_ERROR), this.handleDisconnection());
		}
	}
	processPositiveResponse(e) {
		if (e.length) {
			let t = e.filter(((e) => !this.dispatchedEventIds.has(e.eventId)));
			if (this.missingEventsManager.updateEventRecords(t), t.length) {
				this.dispatchedEventIds = new Set(t.map(((e) => e.eventId))), this.latestEventId = this.findLatestAcknowledgeableEventId(t) ?? this.latestEventId;
				let e = this.missingEventsManager.filterEvents(t);
				this.missingEventsManager.flushMissingEventsRecords(), e.length > 0 && (this.logger.debug("processPositiveResponse()", R.RECEIVED_NEW_EVENTS, {
					sessionId: this.sessionId,
					events: e.map(((e) => ({
						id: e.eventId,
						type: e.eventType
					})))
				}), this.messagingEventProcessor.processEvents(e.map(((e) => ({
					type: e.eventType,
					event: e
				})))));
			} else this.logger.debug("processPositiveResponse()", R.NO_NEW_EVENTS, { sessionId: this.sessionId });
		} else this.latestEventId = null, this.dispatchedEventIds.clear();
	}
	processError(e) {
		this.logger.warn("processError()", "Unexpected error while polling for events.", { sessionId: this.sessionId }, e), (this.state.isConnecting || this.state.isConnected) && this.handleDisconnection(), (this.state.isConnecting || this.state.isRetry || this.state.isConnected) && this.dispatchEventStreamFailed(K.SERVER_UNREACHABLE);
	}
	findLatestAcknowledgeableEventId(e) {
		let t = e.filter(((e) => !this.nonAcknowledgeableEvents.includes(e.eventType)));
		if (t.length > 0) return t[t.length - 1].eventId;
	}
	prepareURL() {
		let e = this.latestEventId ? `?lastEventId=${this.latestEventId}` : "";
		return `${this.config.host}${this.config.sdkBasePath}/v1/messaging-integrations/${this.config.integrationId}/sessions/${this.sessionId}/events${e}`;
	}
	retry() {
		if (this.state.isFailed) {
			if (this.isManualRetryInProgress) return void this.logger.debug("retry()", "Manual retry attempt is already in progress. Ignoring the call.", { sessionId: this.sessionId });
			this.isManualRetryInProgress = !0, this.logger.info("retry()", "Manual reconnect initiated", { sessionId: this.sessionId }), this.restController.send({
				methodType: D.GET,
				url: this.prepareURL(),
				isUrlFull: !0
			}).then(((e) => {
				switch (e.status) {
					case 200:
						this.handleMissingEvents();
						break;
					case 401:
						this.dispatchEventStreamFailed(K.UNAUTHORIZED, !0);
						break;
					case 403:
						this.dispatchEventStreamFailed(K.FORBIDDEN, !0);
						break;
					case 404:
						e.json().then(((e) => {
							e.detail === R.SESSION_NOT_FOUND ? H.dispatchSessionErrorEvent(this.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger) : this.logger.warn("retry()", "Manual retry received 404 for a reason other than session-not-found", {
								sessionId: this.sessionId,
								detail: e.detail
							});
						}));
						break;
					default: this.dispatchEventStreamFailed(K.SERVER_UNREACHABLE, !0);
				}
			})).catch(((e) => {
				this.logger.warn("retry()", "Error occurred during manual retry attempt.", { sessionId: this.sessionId }, e), this.dispatchEventStreamFailed(K.SERVER_UNREACHABLE, !0);
			})).finally((() => {
				this.isManualRetryInProgress = !1;
			}));
		} else {
			if (!this.state.isRetry) throw new s(N.RECONNECT_WITHOUT_STREAM_FAILURE);
			this.logger.info("retry()", "Cancelling scheduled backoff for immediate reconnect attempt", { sessionId: this.sessionId }), this.clearSyntheticDelay?.(), this.resetBackoffMechanism();
		}
	}
	async handleMissingEvents() {
		try {
			let e = await this.missingEventsManager.getMissingMessageEvents(), t = await this.missingEventsManager.getParticipantViews(), n = t.some(((e) => e.currentParticipants.length > 0));
			n && (this.handlePositiveReconnection(), this.dispatchEventStreamConnected());
			let r = e.map(((e) => ({
				type: e.eventType,
				event: e
			})));
			r.push(...t.map(((e) => ({
				type: y.PARTICIPANT_SYNC,
				event: e
			})))), this.messagingEventProcessor.processEvents(r), n ? (this.logger.debug("handleMissingEvents()", "Resuming the long polling.", { sessionId: this.sessionId }), this.poll()) : (this.logger.debug("handleMissingEvents()", "Engagement is not valid. Stopping the long polling.", { sessionId: this.sessionId }), this.stop());
		} catch (e) {
			this.logger.warn("handleMissingEvents()", "Error occurred during manual retry attempt. Manual retry aborted", { sessionId: this.sessionId }, e), ft(e) && e.detail === N.SESSION_NOT_FOUND.detail ? this.dispatchEventStreamFailed(K.SDK_SESSION_INVALID, !0) : this.dispatchEventStreamFailed(K.UNEXPECTED_ERROR, !0);
		} finally {
			this.isManualRetryInProgress = !1;
		}
	}
}, Cn = class {
	state;
	constructor() {
		this.state = Y.Closed;
	}
	getState() {
		return this.state;
	}
	get isClosed() {
		return this.state === Y.Closed;
	}
	get isFailed() {
		return this.state === Y.Failed;
	}
	get isRetry() {
		return this.state === Y.Retry;
	}
	get isPaused() {
		return this.state === Y.Paused;
	}
	get isConnecting() {
		return this.state === Y.Connecting;
	}
	get isConnected() {
		return this.state === Y.Connected;
	}
	toClosed() {
		this.state = Y.Closed;
	}
	toFailed() {
		this.isClosed || (this.state = Y.Failed);
	}
	toRetry() {
		this.isClosed || (this.state = Y.Retry);
	}
	toPaused() {
		this.isClosed || (this.state = this.state = Y.Paused);
	}
	toConnecting() {
		this.state = Y.Connecting;
	}
	toConnected() {
		this.isClosed || (this.state = Y.Connected);
	}
}, wn = class {
	missingEventsCurators;
	sessionId;
	logger;
	constructor(e, t) {
		this.missingEventsCurators = /* @__PURE__ */ new Map(), this.sessionId = e, this.logger = t("MissingConversationEventsManager");
	}
	filterEvents(e) {
		return this.missingEventsCurators.size === 0 ? e : e.filter(((e) => {
			if (e.conversationId === void 0) return !0;
			let t = this.missingEventsCurators.get(e.conversationId);
			return t === void 0 || !t.shouldFilterEvent(e);
		}));
	}
	async getMissingMessageEvents() {
		let e = [], t = [];
		for (let [n, r] of this.missingEventsCurators.entries()) e.push(n), t.push(r.getMissingMessageEvents());
		let n = await Promise.allSettled(t), r = [];
		for (let [t, i] of n.entries()) i.status === "fulfilled" ? r.push(...i.value) : this.logger.warn("getMissingMessageEvents()", "Error fetching missing messages for a curator, skipping it", {
			sessionId: this.sessionId,
			conversationId: e[t]
		}, i.reason);
		return r;
	}
	async getParticipantViews() {
		let e = [], t = [];
		for (let [n, r] of this.missingEventsCurators.entries()) e.push(n), t.push(r.getParticipantView());
		let n = await Promise.allSettled(t), r = [];
		for (let [t, i] of n.entries()) i.status === "fulfilled" ? r.push(i.value) : this.logger.warn("getParticipantViews()", "Error fetching participant view for a curator, skipping it", {
			sessionId: this.sessionId,
			conversationId: e[t]
		}, i.reason);
		return r;
	}
	flushMissingEventsRecords() {
		for (let e of this.missingEventsCurators.values()) e.flushMissingEventsRecords();
	}
	updateEventRecords(e) {
		for (let t of e) t.eventType === G.MESSAGE && t.conversationId !== void 0 && this.missingEventsCurators.get(t.conversationId)?.updateLatestMessageRecord(t.message?.messageId);
	}
	clean() {
		for (let e of this.missingEventsCurators.values()) e.clean();
		this.missingEventsCurators.clear();
	}
	addMissingConversationEventsCurator(e, t) {
		this.missingEventsCurators.set(e, t), this.logger.debug("addMissingConversationEventsCurator()", "Added missing conversation events curator", {
			sessionId: this.sessionId,
			conversationId: e
		});
	}
	removeMissingConversationEventsCurator(e) {
		this.missingEventsCurators.get(e)?.clean(), this.missingEventsCurators.delete(e), this.logger.debug("removeMissingConversationEventsCurator()", "Removed missing conversation events curator", {
			sessionId: this.sessionId,
			conversationId: e
		});
	}
}, Tn = class {
	sessionId;
	eventReceiver;
	eventDispatcher;
	missingEventsManager;
	interestedConversations;
	logger;
	jwtStatusChangeHandlerId;
	shutdownHandlerId;
	checkSessionValidity;
	token;
	sessionTerminated;
	constructor(e, t, n, r, i, a, o, s) {
		this.checkSessionValidity = o, this.eventDispatcher = i, this.sessionId = e, this.logger = r("EventStreamController"), this.missingEventsManager = new wn(e, r), this.sessionTerminated = !1, this.eventReceiver = new Sn(e, t, n, r, a, this.missingEventsManager), this.interestedConversations = /* @__PURE__ */ new Set(), this.token = s, this.jwtStatusChangeHandlerId = this.eventDispatcher.addModuleEventHandler(y.JWT_STATE_CHANGED, this.handleJwtStatusChangeEvent.bind(this)), this.shutdownHandlerId = this.eventDispatcher.addModuleEventHandler(y.SHUTDOWN, this.handleShutdown.bind(this));
	}
	get isSessionValid() {
		return this.checkSessionValidity() && !this.sessionTerminated;
	}
	handleJwtStatusChangeEvent(e) {
		this.isSessionValid ? (this.logger.debug("handleJwtStatusChangeEvent()", R.JWT_STATUS_CHANGED, {
			sessionId: this.sessionId,
			eventDate: e.eventDate,
			jwtStatus: e.status
		}), e.status === b.REINITIALIZED && (this.logger.debug("handleJwtStatusChangeEvent()", "JWT is reinitialized, resuming EventReceiver", { sessionId: this.sessionId }), this.eventReceiver.getStatus() === xn.PAUSED && this.resumeEventReceiver())) : this.logger.debug("handleJwtStatusChangeEvent()", "Session is not valid, ignoring JWT status change event.", { sessionId: this.sessionId });
	}
	handleShutdown() {
		this.logger.debug("handleShutdown()", "Received shutdown event, concluding EventStreamController", { sessionId: this.sessionId }), this.sessionTerminated = !0, this.eventReceiver.stop(), this.interestedConversations.clear(), this.missingEventsManager.clean(), this.eventDispatcher.removeModuleEventHandler(y.JWT_STATE_CHANGED, this.jwtStatusChangeHandlerId);
	}
	addConversation(e, t) {
		this.isSessionValid ? (this.interestedConversations.add(e), this.missingEventsManager.addMissingConversationEventsCurator(e, t), this.logger.debug("addConversation()", "Added conversation to interested conversations", {
			sessionId: this.sessionId,
			conversationId: e
		}), this.interestedConversations.size === 1 && (this.logger.debug("addConversation()", "Conversation has shown interest, starting EventReceiver", { sessionId: this.sessionId }), this.startEventReceiver())) : this.logger.debug("addConversation()", "Session is not valid, ignoring addConversation()", { sessionId: this.sessionId });
	}
	removeConversation(e) {
		this.isSessionValid ? (this.interestedConversations.delete(e), this.missingEventsManager.removeMissingConversationEventsCurator(e), this.logger.debug("removeConversation()", "Removed conversation from interested conversations", {
			sessionId: this.sessionId,
			conversationId: e
		}), this.interestedConversations.size === 0 && (this.logger.debug("removeConversation()", "No more conversations interested, stopping EventReceiver", { sessionId: this.sessionId }), this.stopEventReceiver())) : this.logger.debug("removeConversation()", "Session is not valid, ignoring removeConversation()", { sessionId: this.sessionId });
	}
	tryReconnection() {
		this.isSessionValid ? this.token.isExpired() ? this.logger.warn("tryReconnection()", "Token is expired, cannot retry EventReceiver reconnection.", { sessionId: this.sessionId }) : this.eventReceiver.retry() : this.logger.debug("tryReconnection()", "Session is not valid, ignoring tryReconnection()", { sessionId: this.sessionId });
	}
	startEventReceiver() {
		this.isSessionValid ? this.token.isExpired() ? this.logger.warn("startEventReceiver()", "Token is expired, cannot start event receiver.", { sessionId: this.sessionId }) : this.eventReceiver.start() : this.logger.debug("startEventReceiver()", "Session is not valid, ignoring startEventReceiver()", { sessionId: this.sessionId });
	}
	resumeEventReceiver() {
		this.isSessionValid ? this.eventReceiver.resume() : this.logger.debug("resumeEventReceiver()", "Session is not valid, ignoring resumeEventReceiver()", { sessionId: this.sessionId });
	}
	stopEventReceiver() {
		this.isSessionValid ? this.eventReceiver.stop() : this.logger.debug("stopEventReceiver()", "Session is not valid, ignoring stopEventReceiver()", { sessionId: this.sessionId });
	}
}, En, Dn, X, On, Z, kn, An, jn, Mn, Nn, Pn;
function Fn(e) {
	return function(e) {
		if (!e.eventDispatcher) throw new s(N.EVENT_DISPATCHER_UNAVAILABLE);
		if (!e.isSessionValid) throw new s(N.SESSION_VALIDITY_CHECK_UNAVAILABLE);
		if (!e.loggerFactory) throw new s(N.LOGGER_FACTORY_UNAVAILABLE);
		if (!e.restController) throw new s(N.REST_CONTROLLER_UNAVAILABLE);
		if (!e.config) throw new s(N.INTERNAL_CONFIG_UNAVAILABLE);
		if (!e.sessionId) throw new s(N.SESSION_ID_UNAVAILABLE);
		if (!e.token) throw new s(N.TOKEN_UNAVAILABLE);
		if (!e.isDeliveryNotificationEnabled) throw new s(N.DELIVERY_NOTIFICATION_FLAG_UNAVAILABLE);
	}(e), function(e) {
		return En !== e.sessionId || Dn !== e.token || X !== e.eventDispatcher || On !== e.isSessionValid || An !== e.config || Mn !== e.restController;
	}(e) ? (Z = e.loggerFactory("AvayaInfinityMessaging"), Z.info("setMessagingContext()", "Setting Avaya Infinity Messaging context", { sessionId: e.sessionId }), En = e.sessionId, Dn = e.token, X = e.eventDispatcher, On = e.isSessionValid, An = e.config, Mn = e.restController, Nn = new fn(e.restController, e.config, e.loggerFactory), jn = new bn(e.loggerFactory, X, Nn, e.isDeliveryNotificationEnabled), kn = new Tn(e.sessionId, e.restController, e.config, e.loggerFactory, X, jn, e.isSessionValid, e.token), Pn && X.removeClientEventHandler(y.SHUTDOWN, Pn), Pn = X.addClientEventHandler(y.SHUTDOWN, In), {
		sessionId: En,
		eventDispatcher: X,
		eventStreamController: kn,
		isSessionValid: On,
		config: An,
		messagingEventProcessor: jn,
		restController: Mn,
		token: Dn,
		deliveryAckQueue: Nn
	}) : {
		sessionId: En,
		eventDispatcher: X,
		eventStreamController: kn,
		messagingEventProcessor: jn,
		isSessionValid: On,
		restController: Mn,
		config: An,
		token: Dn,
		deliveryAckQueue: Nn
	};
}
function In() {
	Z?.info("clearMessagingContext()", "Cleared Avaya Infinity Messaging context", { sessionId: En }), X = void 0, Z = void 0, On = void 0, kn = void 0, An = void 0, jn = void 0, Nn = void 0, Mn = void 0, Dn = void 0, En = void 0;
}
var Ln;
function Rn(e, t) {
	return !t.some(((t) => t.messageId === e.messageId)) && !(e.messageIndex && t[0].messageIndex && e.messageIndex > t[0].messageIndex) && !(e.receivedAt && t[0].receivedAt && e.receivedAt > t[0].receivedAt);
}
function zn(e, t) {
	for (let n of e) n.conversationId ||= t;
}
(function(e) {
	function t() {
		if (!On?.()) throw Z.error("validateInitialization()", R.SDK_NOT_INITIALIZED), new s(N.SDK_NOT_INITIALIZED);
		if (!X) throw Z.error("validateInitialization()", "EventDispatcher is undefined"), new s(N.EVENT_DISPATCHER_UNAVAILABLE);
	}
	e.addEventStreamConnectingListener = function(e) {
		return t(), T(w.isFunction(e), "handler should be a function", Z, "addEventStreamConnectingListener()"), X.addClientEventHandler(W.EVENT_STREAM_CONNECTING, e);
	}, e.addEventStreamConnectedListener = function(e) {
		return t(), T(w.isFunction(e), "handler should be a function", Z, "addEventStreamConnectedListener()"), X.addClientEventHandler(W.EVENT_STREAM_CONNECTED, e);
	}, e.addEventStreamFailedListener = function(e) {
		return t(), T(w.isFunction(e), "handler should be a function", Z, "addEventStreamFailedListener()"), X.addClientEventHandler(W.EVENT_STREAM_FAILED, e);
	}, e.addEventStreamClosedListener = function(e) {
		return t(), T(w.isFunction(e), "handler should be a function", Z, "addEventStreamClosedListener()"), X.addClientEventHandler(W.EVENT_STREAM_CLOSED, e);
	}, e.removeEventStreamConnectingListener = function(e) {
		X?.removeClientEventHandler(W.EVENT_STREAM_CONNECTING, e);
	}, e.removeEventStreamConnectedListener = function(e) {
		X?.removeClientEventHandler(W.EVENT_STREAM_CONNECTED, e);
	}, e.removeEventStreamFailedListener = function(e) {
		X?.removeClientEventHandler(W.EVENT_STREAM_FAILED, e);
	}, e.removeEventStreamClosedListener = function(e) {
		X?.removeClientEventHandler(W.EVENT_STREAM_CLOSED, e);
	}, e.reconnect = function() {
		t(), Z?.info("reconnect()", "Manual reconnect invoked"), kn.tryReconnection();
	}, e.version = function() {
		return "1.0.5";
	};
})(Ln ||= {});
var Bn = { with: (e, t, n, r, i, a) => ({
	async fetchMessagesUntilActual(o) {
		let c = [], l = e.sdkBasePath + U.LIST_CONVERSATION.path(e.integrationId, t, n, r, 20, 1), u = !0;
		for (; u;) {
			let d = await i.send({
				methodType: U.LIST_CONVERSATION.requestType,
				url: e.host + l,
				isUrlFull: !0
			});
			if (d.status !== 200) throw new s(N.LIST_CONVERSATION_UNEXPECTED_STATUS, { metadata: { httpStatus: d.status } });
			let f = await d.json();
			if (f && typeof f?.links?.next == "string" && f.links.next !== "" ? l = f.links.next : u = !1, !f || !Array.isArray(f.messages)) {
				a.warn("TranscriptUtils.fetchMessagesUntilActual()", "Didn't receive any messages.", {
					sessionId: n,
					conversationId: t,
					engagementId: r
				});
				break;
			}
			let p = c.length > 0 ? f.messages.filter(((e) => Rn(e, c))) : f.messages, m = o ? p.findIndex(((e) => e.messageId === o)) : -1;
			if (m !== -1) {
				c = c.concat(p.slice(0, m));
				break;
			}
			c = c.concat(p);
		}
		return zn(c, t), c;
	},
	async fetchMessagesUntil(o) {
		let c = e.sdkBasePath + U.LIST_CONVERSATION.path(e.integrationId, t, n, r, 20, 1), l = await i.send({
			methodType: U.LIST_CONVERSATION.requestType,
			url: e.host + c,
			isUrlFull: !0
		});
		if (l.status !== 200) throw new s(N.LIST_CONVERSATION_UNEXPECTED_STATUS, { metadata: { httpStatus: l.status } });
		let u = await l.json();
		if (!u || !Array.isArray(u.messages)) return a.warn("TranscriptUtils.fetchMessagesUntil()", "Didn't receive any messages.", {
			sessionId: n,
			conversationId: t,
			engagementId: r
		}), [];
		let d = [...u.messages].reverse(), f = d.findIndex(((e) => e.messageId === o));
		return f !== -1 && (d = d.slice(0, f)), zn(d, t), d;
	},
	async fetchMessagesAsEventsUntil(e) {
		return (await this.fetchMessagesUntil(e)).map(((e) => Vn(e, n)));
	}
}) };
function Vn(e, t) {
	return {
		eventId: e.messageId,
		eventType: G.MESSAGE,
		conversationId: e.conversationId,
		message: Hn(e),
		participant: {
			participantId: e.senderParticipantId,
			participantType: e.participantType,
			displayName: e.displayName
		},
		eventDate: e.receivedAt,
		engagementId: e.engagementId,
		dialogId: e.dialogId,
		sessionId: t
	};
}
function Hn(e) {
	return {
		messageId: e.messageId,
		parentMessageId: e.parentMessageId,
		messageIndex: e.messageIndex,
		receivedAt: e.receivedAt,
		lastUpdatedAt: e.lastUpdatedAt,
		body: e.body,
		attachments: e.attachments?.map(((e) => e))
	};
}
var Un = class {
	logger;
	sessionId;
	conversationId;
	constructor(e, t, n) {
		this.logger = e("UMRUploader"), this.sessionId = t, this.conversationId = n;
	}
	async upload(e, t, n) {
		let r = R.MEDIA_FILE, i = new FormData();
		i.set(r, t), this.logger.debug("upload()", R.STARTING_ATTACHMENT_UPLOAD, {
			sessionId: this.sessionId,
			conversationId: this.conversationId,
			fileName: t.name,
			fileType: n,
			fileSize: t.size
		});
		let a = await fetch(e, {
			method: D.POST,
			body: i
		});
		if (a.status !== 202) throw this.logger.error("upload()", R.UPLOAD_ATTACHMENT_FAILED, {
			sessionId: this.sessionId,
			conversationId: this.conversationId,
			fileName: t.name,
			fileType: n,
			fileSize: t.size,
			status: `HTTP ${a.status}`
		}), new s(N.UPLOAD_ATTACHMENT_REQUEST_FAILED);
		return a;
	}
}, Wn = {
	name: _t,
	properties: { [vt.considerSentOnDelivered]: "true" },
	configurations: []
}, Q;
(function(e) {
	e.SILENCE = "SILENCE", e.INITIATING = "INITIATING", e.RESUMING = "RESUMING", e.ACTIVE = "ACTIVE", e.CLOSED = "CLOSED";
})(Q ||= {});
var Gn = class {
	conversationId;
	sessionId;
	_currentState = Q.SILENCE;
	channelActivation;
	logger;
	constructor(e, t, n) {
		this.conversationId = e, this.sessionId = t, this.channelActivation = He(), this.logger = n("MessagingChannelStateController");
	}
	get activation() {
		return this.channelActivation.promise;
	}
	get currentState() {
		return this._currentState;
	}
	get isSilence() {
		return this._currentState === Q.SILENCE;
	}
	get isInitiating() {
		return this._currentState === Q.INITIATING;
	}
	get isResuming() {
		return this._currentState === Q.RESUMING;
	}
	get isActive() {
		return this._currentState === Q.ACTIVE;
	}
	get isClosed() {
		return this._currentState === Q.CLOSED;
	}
	get logContext() {
		return {
			sessionId: this.sessionId,
			conversationId: this.conversationId
		};
	}
	logTransition(e, t, n) {
		this.logger.debug(e, `Messaging Channel State changed: ${t} -> ${n}`, {
			...this.logContext,
			fromState: t,
			toState: n
		});
	}
	transitionToSilence() {
		if (this._currentState === Q.SILENCE) return void this.logger.debug("transitionToSilence()", `Messaging Channel State is already ${Q.SILENCE}`, this.logContext);
		if (this._currentState === Q.CLOSED) return void this.logger.warn("transitionToSilence()", `Messaging Channel State is already ${Q.CLOSED}`, this.logContext);
		let e = this._currentState;
		this._currentState = Q.SILENCE, this.channelActivation = He(), this.logTransition("transitionToSilence()", e, Q.SILENCE);
	}
	transitionToInitiating() {
		if (this._currentState === Q.INITIATING) return void this.logger.debug("transitionToInitiating()", `Messaging Channel State is already ${Q.INITIATING}`, this.logContext);
		if (this._currentState === Q.CLOSED) return void this.logger.warn("transitionToInitiating()", `Messaging Channel State is already ${Q.CLOSED}`, this.logContext);
		let e = this._currentState;
		this._currentState = Q.INITIATING, this.logTransition("transitionToInitiating()", e, Q.INITIATING);
	}
	transitionToResuming() {
		if (this._currentState === Q.RESUMING) return void this.logger.debug("transitionToResuming()", `Messaging Channel State is already ${Q.RESUMING}`, this.logContext);
		if (this._currentState === Q.CLOSED) return void this.logger.warn("transitionToResuming()", `Messaging Channel State is already ${Q.CLOSED}`, this.logContext);
		let e = this._currentState;
		this._currentState = Q.RESUMING, this.logTransition("transitionToResuming()", e, Q.RESUMING);
	}
	transitionToActive() {
		if (this._currentState === Q.ACTIVE) return void this.logger.debug("transitionToActive()", `Messaging Channel State is already ${Q.ACTIVE}`, this.logContext);
		if (this._currentState === Q.CLOSED) return void this.logger.warn("transitionToActive()", `Messaging Channel State is already ${Q.CLOSED}`, this.logContext);
		let e = this._currentState;
		this._currentState = Q.ACTIVE, this.channelActivation.resolve(), this.logTransition("transitionToActive()", e, Q.ACTIVE);
	}
	transitionToClosed() {
		if (this._currentState === Q.CLOSED) return void this.logger.debug("transitionToClosed()", `Messaging Channel State is already ${Q.CLOSED}`, this.logContext);
		this.isActive || (this.logger.debug("transitionToClosed()", "Moving from inactive state to closed state, rejecting channel activation", this.logContext), this.channelActivation.promise.catch((() => {})), this.channelActivation.reject());
		let e = this._currentState;
		this._currentState = Q.CLOSED, this.logTransition("transitionToClosed()", e, Q.CLOSED);
	}
}, Kn = class {
	cannedMessages = [];
	sendMessageMap = /* @__PURE__ */ new Map();
	welcomeMessageList = [];
	timedMessageList = [];
	logger;
	archivedCannedMessages = [];
	constructor(e) {
		this.logger = e("CannedMessageUtils");
	}
	getCannedMessages() {
		return this.cannedMessages;
	}
	setCannedMessages(e) {
		this.cannedMessages = e;
	}
	addCannedMessage(e) {
		this.cannedMessages.push(e);
	}
	clearCannedMessages() {
		this.cannedMessages = [];
	}
	getWelcomeMessageList() {
		return this.welcomeMessageList;
	}
	setWelcomeMessageList(e) {
		this.welcomeMessageList = e;
	}
	addWelcomeMessageList(e) {
		this.welcomeMessageList.push(e), this.logger.debug("addWelcomeMessageList", "Adding welcome message to the list", { messageId: e.messageId });
	}
	clearWelcomeMessageList() {
		this.welcomeMessageList = [];
	}
	getTimedMessageList() {
		return this.timedMessageList;
	}
	setTimedMessageList(e) {
		this.timedMessageList = e;
	}
	addTimedMessageList(e) {
		this.timedMessageList.push(e), this.logger.debug("addTimedMessageList", "Adding timed message to the list", {
			messageId: e.messageId,
			time: e.time
		});
	}
	clearTimedMessageList() {
		this.timedMessageList = [];
	}
	getSendMessageList() {
		return Array.from(this.sendMessageMap.values());
	}
	addSendMessageList(e) {
		this.sendMessageMap.set(e.messageId, e), this.archivedCannedMessages.push(e), this.logger.debug("addSendMessageList", "Adding message to sendMessageMap", { messageId: e.messageId });
	}
	getArchivedCannedMessages() {
		return this.archivedCannedMessages;
	}
	clearSendMessageList() {
		this.sendMessageMap.clear();
	}
}, qn = class {
	cannedMessageUtils;
	featureConfiguration;
	conversationDetails;
	logger;
	eventProcessor;
	conversationId;
	timedMessageTimers = [];
	engagementExists;
	constructor(e, t, n, r, i, a) {
		this.featureConfiguration = e, this.conversationDetails = t, this.logger = n("CannedMessagesController"), this.cannedMessageUtils = new Kn(n), this.eventProcessor = i, this.conversationId = r, this.engagementExists = a, this.initializeCannedMessages(), this.logger.info("constructor()", "CannedMessagesController initialized.", {
			sessionId: this.conversationDetails.sessionId,
			conversationId: this.conversationId,
			engagementExists: this.engagementExists
		}), r && !this.engagementExists && this.scheduleTimedMessage();
	}
	buildRichMediaPayload(e) {
		return { actions: (e.actions ?? []).map(((e) => e.type === I.LINK ? {
			type: I.LINK,
			text: e.text,
			uri: e.uri
		} : {
			type: I.REPLY,
			text: e.text,
			payload: e.payload
		})) };
	}
	normalizeAction(e) {
		if (typeof e != "object" || !e) return;
		let t = e, n = t.type;
		if (n !== I.REPLY && n !== I.LINK) return;
		let r = typeof t.text == "string" ? t.text : "";
		if (r) return {
			type: n,
			text: this.decodeHtmlEntities(r),
			...typeof t.uri == "string" ? { uri: t.uri } : {},
			...typeof t.payload == "string" ? { payload: t.payload } : {}
		};
	}
	normalizeTemplateData(e) {
		if (e == null) return;
		let t = e;
		if (typeof e == "string") try {
			t = JSON.parse(e);
		} catch {
			this.logger.warn("normalizeTemplateData", "Invalid JSON in templateData; ignoring template.", { conversationId: this.conversationId });
			return;
		}
		if (typeof t != "object" || !t) return;
		let n = t, r = typeof n.text == "string" ? n.text : "", i = r ? this.decodeHtmlEntities(r) : "", a = Array.isArray(n.actions) ? n.actions.map(((e) => this.normalizeAction(e))).filter(((e) => e !== void 0)) : void 0;
		return i || a && a.length !== 0 ? {
			text: i,
			actions: a
		} : void 0;
	}
	getOpenTemplate(e) {
		if (e.messageType === "richMedia" && e.richMediaTemplate) return this.normalizeTemplateData(e.richMediaTemplate);
		if (e.messageType === "template" && e.templateData !== void 0 && e.templateData !== null) return e.time && e.unit ? void 0 : this.normalizeTemplateData(e.templateData);
	}
	getTimedTemplate(e) {
		if (e.messageType === "richMedia" && e.richMediaTimerTemplate) return this.normalizeTemplateData(e.richMediaTimerTemplate);
		if (e.messageType === "template") {
			if (e.templateTimerData !== void 0 && e.templateTimerData !== null) return this.normalizeTemplateData(e.templateTimerData);
			if (e.templateData !== void 0 && e.templateData !== null && e.time && e.unit) return this.normalizeTemplateData(e.templateData);
		}
	}
	initializeCannedMessages() {
		let e = this.featureConfiguration.getSubFeature("cannedMessages"), t = globalThis.location.href;
		if (e && e.hasSubFeatures() && !1 !== e.isEnabled) {
			for (let n of e.getAllSubFeatures()) {
				if (!Rt(n.name).test(t)) continue;
				let e = n.getRawProperty("messages");
				if (typeof e != "string" || e.length === 0) continue;
				let r = [];
				try {
					let t = JSON.parse(e);
					Array.isArray(t) && (r = t);
				} catch {
					this.logger.warn("initializeCannedMessages", "Invalid JSON in cannedMessages `messages` property; treating as empty list.", { conversationId: this.conversationId });
				}
				for (let e of r) {
					let t = this.getOpenTemplate(e);
					if (t) {
						let n = this.buildRichMediaPayload(t), r = typeof e.onOpenMessage == "string" && e.onOpenMessage || t.text || "";
						this.cannedMessageUtils.addWelcomeMessageList({
							messageId: k(R.BYTE_LENGTH_MESSAGE_ID),
							onOpenMessage: r,
							richMediaPayload: n
						});
					} else typeof e.onOpenMessage == "string" && e.onOpenMessage && this.cannedMessageUtils.addWelcomeMessageList({
						messageId: k(R.BYTE_LENGTH_MESSAGE_ID),
						onOpenMessage: e.onOpenMessage
					});
					if (typeof e.timeMessage == "string" && e.timeMessage && e.time && e.unit) {
						let t = new Date(this.conversationDetails.createdAt), n = Lt(String(e.time), String(e.unit)), r = t.getTime() + n - Date.now();
						isNaN(r) || r <= 0 ? this.cannedMessageUtils.addWelcomeMessageList({
							messageId: k(R.BYTE_LENGTH_MESSAGE_ID),
							onOpenMessage: e.timeMessage
						}) : this.cannedMessageUtils.addTimedMessageList({
							messageId: k(R.BYTE_LENGTH_MESSAGE_ID),
							timeMessage: e.timeMessage,
							time: r,
							expectedTime: new Date(t.getTime() + n)
						});
					} else if (this.getTimedTemplate(e) && e.time && e.unit) {
						let t = this.getTimedTemplate(e), n = new Date(this.conversationDetails.createdAt), r = Lt(String(e.time), String(e.unit)), i = n.getTime() + r - Date.now(), a = this.buildRichMediaPayload(t), o = typeof e.timeMessage == "string" && e.timeMessage || t.text || "";
						isNaN(i) || i <= 0 ? this.cannedMessageUtils.addWelcomeMessageList({
							messageId: k(R.BYTE_LENGTH_MESSAGE_ID),
							onOpenMessage: o,
							richMediaPayload: a
						}) : this.cannedMessageUtils.addTimedMessageList({
							messageId: k(R.BYTE_LENGTH_MESSAGE_ID),
							timeMessage: o,
							time: i,
							expectedTime: new Date(n.getTime() + r),
							richMediaPayload: a
						});
					}
				}
			}
			this.cannedMessageUtils.getWelcomeMessageList().length === 0 && this.cannedMessageUtils.getTimedMessageList().length === 0 && this.logger.debug("initializeCannedMessages", "No matching URLs found in cannedMessages configurations.", { conversationId: this.conversationId });
		} else this.logger.debug("initializeCannedMessages", "CannedMessages feature or sub-features not found.", { conversationId: this.conversationId });
	}
	clearAllMessages() {
		this.cannedMessageUtils.clearSendMessageList(), this.cannedMessageUtils.clearWelcomeMessageList(), this.cannedMessageUtils.clearTimedMessageList();
	}
	getWelcomeMessages() {
		let e = [], t = this.cannedMessageUtils.getWelcomeMessageList();
		for (let n of t) {
			let t = n.richMediaPayload !== void 0, r = {
				messageId: n.messageId,
				body: {
					elementText: {
						text: n.onOpenMessage,
						textFormat: P.PLAINTEXT
					},
					elementType: t ? F.REPLY : F.TEXT,
					...t ? { richMediaPayload: n.richMediaPayload } : {}
				},
				senderParticipant: {
					participantId: k(13),
					participantType: h.SYSTEM,
					displayName: this.getBotName()
				},
				attachments: [],
				receivedAt: /* @__PURE__ */ new Date(),
				lastUpdatedAt: /* @__PURE__ */ new Date(),
				conversationId: this.conversationId,
				canned: !0
			};
			e.push(r), this.cannedMessageUtils.addSendMessageList(r);
		}
		return e;
	}
	dispatchTimedMessageEvent(e) {
		this.logger.debug("dispatchTimedMessage", `Dispatching timed message with ID: ${e.messageId}`, {
			conversationId: this.conversationId,
			messageId: e.messageId
		}), this.eventProcessor.processEvents([{
			type: W.MESSAGE_ARRIVED,
			event: e
		}]);
	}
	scheduleTimedMessage() {
		let e = this.cannedMessageUtils.getTimedMessageList();
		e.sort(((e, t) => e.time - t.time)), this.stopAllTimedMessages();
		for (let t of e) {
			let e = t.richMediaPayload !== void 0, n = {
				messageId: t.messageId,
				body: {
					elementText: {
						text: t.timeMessage,
						textFormat: P.PLAINTEXT
					},
					elementType: e ? F.REPLY : F.TEXT,
					...e ? { richMediaPayload: t.richMediaPayload } : {}
				},
				senderParticipant: {
					participantId: k(13),
					participantType: h.SYSTEM,
					displayName: this.getBotName()
				},
				attachments: [],
				receivedAt: t.expectedTime,
				lastUpdatedAt: t.expectedTime,
				conversationId: this.conversationId,
				canned: !0
			}, r = {
				messageId: n.messageId,
				body: n.body,
				attachments: n.attachments,
				receivedAt: n.receivedAt,
				lastUpdatedAt: n.lastUpdatedAt,
				senderParticipant: n.senderParticipant,
				eventDate: /* @__PURE__ */ new Date(),
				conversationId: this.conversationId,
				canned: !0
			}, i = new v("TimedMessageEventController", t.time, (() => {
				this.logger.debug("scheduleTimedMessage", `Timed message dispatched: ${n.messageId}`, {
					conversationId: this.conversationId,
					messageId: n.messageId
				}), this.dispatchTimedMessageEvent(r), this.cannedMessageUtils.addSendMessageList(n), this.removeTimer(i);
			}));
			i.start(), this.timedMessageTimers.push(i), this.logger.debug("scheduleTimedMessage", "Timed message timer started.", {
				conversationId: this.conversationId,
				messageId: n.messageId,
				delay: t.time
			});
		}
	}
	stopAllTimedMessages() {
		let e = this.timedMessageTimers.length;
		for (let e of this.timedMessageTimers) e.stop();
		this.timedMessageTimers = [], this.logger.debug("stopAllTimedMessages", "All timed message timers stopped.", {
			conversationId: this.conversationId,
			stoppedTimerCount: e
		});
	}
	removeTimer(e) {
		let t = this.timedMessageTimers.indexOf(e);
		t !== -1 && (this.timedMessageTimers.splice(t, 1), this.logger.debug("removeTimer", "Timer removed from the list.", {
			conversationId: this.conversationId,
			remainingTimerCount: this.timedMessageTimers.length
		}));
	}
	resetEngagementExists() {
		this.engagementExists = !1;
	}
	transformToCannedMessage() {
		return this.cannedMessageUtils.getSendMessageList().map(((e) => ({
			text: this.decodeHtmlEntities(e.body.elementText.text),
			createdAt: e.receivedAt.toISOString(),
			...e.body.richMediaPayload ? { richMediaPayload: e.body.richMediaPayload } : {}
		})));
	}
	decodeHtmlEntities(e) {
		let t = document.createElement("textarea");
		return t.innerHTML = e, t.value;
	}
	getEngagementExists() {
		return this.engagementExists;
	}
	setEngagementExists(e) {
		this.engagementExists = e;
	}
	replaceCannedMessageIds(e) {
		let t = 0, n = this.cannedMessageUtils.getArchivedCannedMessages();
		for (let r of e) r.canned && t < n.length && (r.messageId = n[t].messageId, t++);
		return e;
	}
	getBotName() {
		return this.featureConfiguration.getRawPropertyOrDefault(vt.botname, "AI Assistant");
	}
	deactivate() {
		this.stopAllTimedMessages(), this.clearAllMessages(), this.resetEngagementExists(), this.logger.debug("deactivate", "Deactivated CannedMessagesController.", { conversationId: this.conversationId });
	}
}, Jn = class {
	lastMessageId;
	sessionId;
	conversationId;
	engagementId;
	dispatchedMessageIds;
	dispatchedParticipantIds;
	messagingEventProcessor;
	restController;
	logger;
	config;
	constructor(e, t, n, r, i, a, o) {
		this.sessionId = e, this.conversationId = t, this.engagementId = n, this.messagingEventProcessor = r, this.dispatchedMessageIds = /* @__PURE__ */ new Set(), this.dispatchedParticipantIds = /* @__PURE__ */ new Set(), this.restController = a, this.logger = o("MissingConversationEventsCurator"), this.config = i, this.lastMessageId = void 0;
	}
	get logContext() {
		return {
			sessionId: this.sessionId,
			conversationId: this.conversationId,
			engagementId: this.engagementId
		};
	}
	async getMissingMessageEvents() {
		this.logger.debug("getMissingMessageEvents()", "Fetching missing message events", {
			...this.logContext,
			lastMessageId: this.lastMessageId
		});
		let e = await Bn.with(this.config, this.conversationId, this.sessionId, this.engagementId, this.restController, this.logger).fetchMessagesUntil(this.lastMessageId);
		return e.reverse(), this.dispatchedMessageIds = new Set(e.map(((e) => e.messageId))), e.map(((e) => Vn(e, this.sessionId)));
	}
	async getParticipantView() {
		this.logger.debug("getParticipantView()", "Fetching latest participant view", this.logContext);
		let e = await this.fetchLatestParticipantView();
		return this.dispatchedParticipantIds = new Set(e.participants.map(((e) => e.participantId))), this.transformToParticipantViewSyncEvent(this.conversationId, e);
	}
	flushMissingEventsRecords() {
		this.dispatchedMessageIds.size === 0 && this.dispatchedParticipantIds.size === 0 || (this.dispatchedMessageIds.clear(), this.dispatchedParticipantIds.clear(), this.logger.debug("flushMissingEventsRecords()", "Flushed missing events records", this.logContext));
	}
	updateLatestMessageRecord(e) {
		this.lastMessageId = e;
	}
	shouldFilterEvent(e) {
		return (this.dispatchedMessageIds.size !== 0 || this.dispatchedParticipantIds.size !== 0) && (!!this.shouldFilterMessageEvent(e) || !!this.shouldFilterParticipantEvent(e));
	}
	clean() {
		this.flushMissingEventsRecords(), this.lastMessageId = void 0;
	}
	shouldFilterMessageEvent(e) {
		return !!e && e.eventType === G.MESSAGE && !!e?.message?.messageId && this.dispatchedMessageIds.has(e.message.messageId);
	}
	shouldFilterParticipantEvent(e) {
		return !!e && (e.eventType === G.PARTICIPANT_ADDED || e.eventType === G.PARTICIPANT_DISCONNECTED) && !!e?.participant?.participantId && (e.eventType === G.PARTICIPANT_ADDED ? this.dispatchedParticipantIds.has(e.participant.participantId) : !this.dispatchedParticipantIds.has(e.participant.participantId));
	}
	async fetchLatestParticipantView() {
		let e = await this.getSession(), t = Array.isArray(e?.engagements) ? e.engagements.filter(((e) => e.conversationId === this.conversationId))[0] : void 0, n = Array.isArray(t?.dialogs) ? t.dialogs[0] : void 0, r = n?.participants;
		return r === void 0 && this.logger.warn("fetchLatestParticipantView()", "Participant/engagement info is undefined", {
			...this.logContext,
			engagementId: t?.engagementId,
			dialogId: n?.dialogId
		}), {
			participants: r ?? [],
			engagementId: t?.engagementId,
			dialogId: n?.dialogId,
			sessionId: this.sessionId
		};
	}
	async getSession() {
		let e = await this.restController.send({
			methodType: D.GET,
			url: U.GET_SESSION.path(this.config.integrationId, this.sessionId),
			isUrlFull: !1
		});
		if (e.status !== 200) {
			let t = await e.json();
			throw H.isSessionNotFoundResponse(e.status, t) ? (H.dispatchSessionErrorEvent(this.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger), new s(N.SESSION_NOT_FOUND)) : new s(N.GET_SESSION_UNEXPECTED_STATUS, { metadata: { httpStatus: e.status } });
		}
		return await e.json();
	}
	transformToParticipantViewSyncEvent(e, t) {
		return {
			conversationId: e,
			eventDate: /* @__PURE__ */ new Date(),
			channel: x.MESSAGING,
			currentParticipants: t.participants.map(((e) => S(e.participantId, e.participantType, x.MESSAGING, e.displayName)))
		};
	}
}, Yn = class {
	conversationId;
	conversationDetails;
	restController;
	jwt;
	config;
	defaultEngagement;
	eventStreamController;
	logger;
	isSessionValid;
	loggerFactory;
	handlerIdMap = /* @__PURE__ */ new Map();
	eventDispatcher;
	messagingEventProcessor;
	inactivityTimerController;
	contextParameters;
	messagingChannelStateController;
	sessionPollingManager;
	sessionPollingListenerId = void 0;
	featureConfiguration;
	typingIndicators;
	participantRegistry;
	isConversationClosable;
	channelRegistry;
	conversationStatusChecker;
	pendingMessages;
	pendingAlternativeAttachmentMessages;
	lastEngagementId = void 0;
	downloadTranscriptUrlCache;
	downloadTranscriptFileNameCache;
	latestDeliveredMessageId = void 0;
	deliveryAckQueue;
	cannedMessagesController;
	engagementExists = !1;
	constructor(e) {
		let { conversationId: t, conversationDetails: n, restController: r, jwt: i, config: a, isSessionValid: o, loggerFactory: s, eventDispatcher: c, inactivityTimerController: l, contextParameters: u, sessionPollingManager: d, features: f, participantRegistry: p, channelRegistry: m, conversationStatusChecker: h } = e;
		this.conversationId = t, this.conversationDetails = n, this.restController = r, this.jwt = i, this.config = a, this.logger = s("MessagingDelegate"), this.isSessionValid = o, this.loggerFactory = s, this.eventDispatcher = c, this.inactivityTimerController = l, this.contextParameters = u, this.messagingChannelStateController = new Gn(t, n.sessionId, e.loggerFactory), this.sessionPollingManager = d, this.channelRegistry = m, this.conversationStatusChecker = h, this.channelRegistry.registerConversationChannel(R.MESSAGING_CHANNEL_NAME), this.featureConfiguration = f.getFeatureOrDefault(_t, Wn);
		let { eventStreamController: g, messagingEventProcessor: ee, deliveryAckQueue: te } = Fn({
			sessionId: n.sessionId,
			eventDispatcher: c,
			isSessionValid: o,
			loggerFactory: s,
			config: a,
			restController: r,
			token: this.jwt,
			isDeliveryNotificationEnabled: () => V.isDeliveryNotificationEnabled(this.featureConfiguration)
		});
		this.messagingEventProcessor = ee, this.eventStreamController = g, this.deliveryAckQueue = te, this.isConversationClosable = V.areConversationsClosable(f), this.participantRegistry = p, this.pendingMessages = /* @__PURE__ */ new Map(), this.pendingAlternativeAttachmentMessages = /* @__PURE__ */ new Map(), this.engagementExists = this.conversationDetails.engagements.length > 0, this.cannedMessagesController = new qn(this.featureConfiguration, this.conversationDetails, s, t, this.messagingEventProcessor, this.engagementExists), this.typingIndicators = new dn(n.sessionId, t, this.featureConfiguration, c, this.messagingEventProcessor, o, s, this.participantRegistry, r, a), this.registerCallbacks(), this.engagementExists ? this.joinEngagement(Ht.EXISTING, this.conversationDetails.engagements[0]).catch(((e) => {
			this.logger.error("constructor()", "Failed to join existing engagement.", {
				...this.logContext,
				engagementId: n.engagements[0].engagementId
			}, e), this.joinEngagementFailureCleanup(e);
		})) : this.startListeningSessionPoll();
	}
	get isAlternativeAttachmentFlowEnabled() {
		return V.useAlternativeAttachmentFlow(this.featureConfiguration);
	}
	get logContext() {
		return {
			sessionId: this.conversationDetails.sessionId,
			conversationId: this.conversationId
		};
	}
	assertSessionValidity() {
		if (!this.isSessionValid()) throw this.concludeEngagement(!0), this.logger.error("assertSessionValidity()", R.SDK_NOT_INITIALIZED, this.logContext), new s(N.SDK_NOT_INITIALIZED);
	}
	assertConversationActive() {
		if (!this.conversationStatusChecker.isOperational()) throw new s(N.OPERATION_ON_DEFUNCT_CONVERSATION);
	}
	assertMessagingChannelOpen() {
		if (this.messagingChannelStateController.isClosed) throw new s(N.OPERATION_ON_CLOSED_CHANNEL);
	}
	async initEngagement() {
		if (this.defaultEngagement === void 0 && this.messagingChannelStateController.isSilence) try {
			this.stopListeningSessionPoll(), await this.createEngagement();
		} catch (e) {
			if (!ft(e)) throw this.transitionToSilenceAndListen(), e;
			switch (e.detail) {
				case N.CREATION_FAILED_ENGAGEMENT_EXISTS.detail:
					this.logger.debug("initEngagement()", "Engagement creation failed as one already exists. Trying to join the existing engagement.", this.logContext), await this.handleEngagementExists();
					break;
				case N.CREATION_FAILED_CONVERSATION_NOT_FOUND.detail: throw this.closeMessagingChannel(), e;
				default: throw this.transitionToSilenceAndListen(), e;
			}
		}
	}
	registerCallbacks() {
		this.handlerIdMap.set(W.ENGAGEMENT_ERROR, this.eventDispatcher.addModuleEventHandler(W.ENGAGEMENT_ERROR, this.handleEngagementError.bind(this), this.conversationId)), this.handlerIdMap.set(y.PARTICIPANT_ADDED, this.eventDispatcher.addModuleEventHandler(y.PARTICIPANT_ADDED, this.handleParticipantAddition.bind(this), this.conversationId)), this.handlerIdMap.set(y.PARTICIPANT_DISCONNECTED, this.eventDispatcher.addModuleEventHandler(y.PARTICIPANT_DISCONNECTED, this.handleParticipantRemoval.bind(this), this.conversationId)), this.handlerIdMap.set(y.SHUTDOWN, this.eventDispatcher.addModuleEventHandler(y.SHUTDOWN, this.handleSdkShutdown.bind(this))), this.handlerIdMap.set(W.MESSAGE_DELIVERED, this.eventDispatcher.addModuleEventHandler(W.MESSAGE_DELIVERED, this.handleCustomerMessage.bind(this), this.conversationId)), this.handlerIdMap.set(W.MESSAGE_ARRIVED, this.eventDispatcher.addModuleEventHandler(W.MESSAGE_ARRIVED, this.handleNonCustomerMessage.bind(this), this.conversationId)), this.handlerIdMap.set(y.END_CONVERSATION_INITIATED, this.eventDispatcher.addModuleEventHandler(y.END_CONVERSATION_INITIATED, this.handleEndConversationInitiated.bind(this), this.conversationId));
	}
	unregisterCallbacks() {
		let e = this.handlerIdMap.get(W.ENGAGEMENT_ERROR);
		e !== void 0 && this.eventDispatcher.removeModuleEventHandler(W.ENGAGEMENT_ERROR, e, this.conversationId);
		let t = this.handlerIdMap.get(y.PARTICIPANT_ADDED);
		t !== void 0 && this.eventDispatcher.removeModuleEventHandler(y.PARTICIPANT_ADDED, t, this.conversationId);
		let n = this.handlerIdMap.get(y.PARTICIPANT_DISCONNECTED);
		n !== void 0 && this.eventDispatcher.removeModuleEventHandler(y.PARTICIPANT_DISCONNECTED, n, this.conversationId);
		let r = this.handlerIdMap.get(y.SHUTDOWN);
		r !== void 0 && this.eventDispatcher.removeModuleEventHandler(y.SHUTDOWN, r);
		let i = this.handlerIdMap.get(W.MESSAGE_DELIVERED);
		i !== void 0 && this.eventDispatcher.removeModuleEventHandler(W.MESSAGE_DELIVERED, i, this.conversationId);
		let a = this.handlerIdMap.get(W.MESSAGE_ARRIVED);
		a !== void 0 && this.eventDispatcher.removeModuleEventHandler(W.MESSAGE_ARRIVED, a, this.conversationId);
		let o = this.handlerIdMap.get(y.END_CONVERSATION_INITIATED);
		o !== void 0 && this.eventDispatcher.removeModuleEventHandler(y.END_CONVERSATION_INITIATED, o, this.conversationId);
	}
	startListeningSessionPoll() {
		this.sessionPollingListenerId = this.sessionPollingManager.subscribe(this.handleConversationSync.bind(this));
	}
	stopListeningSessionPoll() {
		this.sessionPollingListenerId &&= (this.sessionPollingManager.unsubscribe(this.sessionPollingListenerId), void 0);
	}
	startListeningForEvents(e) {
		this.eventStreamController.addConversation(this.conversationId, this.createMissingEventsCurator(e));
	}
	stopListeningForEvents() {
		this.eventStreamController.removeConversation(this.conversationId);
	}
	validateMessageText(e) {
		T(C.isOptionalAnd.notUndefined(e) && C.notBlank(e), B.Message.shouldNotBeEmpty, this.logger, "validateMessageText()"), T(C.notMoreThan(e, yt), B.Message.shouldNotBeMoreThan, this.logger, "validateMessageText()");
	}
	validateAttachmentText(e) {
		T(C.isOptionalAnd.notMoreThan(e, yt), B.Message.shouldNotBeMoreThan, this.logger, "validateAttachmentText()");
	}
	validateAttachmentMessage(e) {
		this.validateAttachmentText(e.getText()), T(e.getAttachment() instanceof File, B.Attachment.shouldBeFile, this.logger, "validateAttachmentMessage()");
		let t = e.getAttachment().name.split(".").pop()?.toLocaleLowerCase() ?? "";
		T(V.getListOfSupportedAttachmentExtensions(this.featureConfiguration).includes(t), B.Attachment.type.shouldBeSupportedExtension, this.logger, "validateAttachmentMessage()"), T(C.notLessThan(e.getAttachment().name, bt), B.Attachment.name.shouldNotBeLessThan, this.logger, "validateAttachmentMessage()"), T(C.notLessThan(e.getAttachment().type === void 0 || e.getAttachment().type === "" ? R.DEFAULT_MIME_TYPE : e.getAttachment().type, xt), B.Attachment.type.shouldBeValid, this.logger, "validateAttachmentMessage()"), T(Ie.notLessThan(e.getAttachment().size, Pt), B.Attachment.size.shouldNotBeLessThan, this.logger, "validateAttachmentMessage()"), T(Ie.notMoreThan(1e-6 * e.getAttachment().size, V.getMaxAttachmentSize(this.featureConfiguration)), B.Attachment.size.shouldNotBeMoreThan, this.logger, "validateAttachmentMessage()");
	}
	validatePostBackAction(e) {
		T(w.isNonNullableObject(e), B.Action.shouldBeObject, this.logger, "validatePostBackAction()"), T(C.isOptionalAnd.isOneOf(e.getActionType(), [mt.POST_BACK]), B.Action.actionType.shouldBeOneOf, this.logger, "validatePostBackAction()"), T(C.isOptionalAnd.notMoreThan(e.getActionText(), St), B.Action.text.shouldNotBeMoreThan, this.logger, "validatePostBackAction()"), T(C.isOptionalAnd.notMoreThan(e.getPayload(), Ct), B.Action.payload.shouldNotBeMoreThan, this.logger, "validatePostBackAction()");
	}
	validateReplyAction(e) {
		T(w.isNonNullableObject(e), B.Action.shouldBeObject, this.logger, "validateReplyAction()"), T(C.isOptionalAnd.isOneOf(e.getActionType(), [mt.REPLY]), B.Action.actionType.shouldBeOneOf, this.logger, "validateReplyAction()"), T(C.isOptionalAnd.notMoreThan(e.getActionText(), St), B.Action.text.shouldNotBeMoreThan, this.logger, "validateReplyAction()"), T(C.isOptionalAnd.notMoreThan(e.getPayload(), Ct), B.Action.payload.shouldNotBeMoreThan, this.logger, "validateReplyAction()"), T(C.isOptionalAnd.notMoreThan(e.getIconUrl(), wt), B.Action.iconUrl.shouldNotBeMoreThan, this.logger, "validateReplyAction()");
	}
	validateLocationMessage(e) {
		T(w.isNonNullableObject(e), B.Location.shouldBeObject, this.logger, "validateLocationMessage()"), T(Ie.between(e.getLatitude(), Tt, Et), B.LocationCoordinates.shouldBeValidLatitude, this.logger, "validateLocationMessage()"), T(Ie.between(e.getLongitude(), Dt, Ot), B.LocationCoordinates.shouldBeValidLongitude, this.logger, "validateLocationMessage()"), T(C.isOptionalAnd.notMoreThan(e.getName(), kt), B.LocationDetails.name.shouldNotBeMoreThan, this.logger, "validateLocationMessage()"), T(C.isOptionalAnd.notMoreThan(e.getAddress(), At), B.LocationDetails.address.shouldNotBeMoreThan, this.logger, "validateLocationMessage()");
	}
	validatePageSize(e) {
		T(typeof e == "number", B.PageSize.shouldBeNumber, this.logger, "getMessages()"), T(Ie.between(e, jt, Mt), B.PageSize.shouldBeBetween, this.logger, "getMessages()");
	}
	createMissingEventsCurator(e) {
		return new Jn(this.conversationDetails.sessionId, this.conversationId, e.engagementId, this.messagingEventProcessor, this.config, this.restController, this.loggerFactory);
	}
	async createEngagement() {
		this.messagingChannelStateController.transitionToInitiating();
		let e = await this.restController.send({
			methodType: U.CREATE_ENGAGEMENT.requestType,
			url: U.CREATE_ENGAGEMENT.path(this.config.integrationId),
			requestBody: JSON.stringify({
				sessionId: this.conversationDetails.sessionId,
				engagementParameters: this.contextParameters.parameters
			}),
			isUrlFull: !1
		});
		if (!e.ok) {
			let t = await e.json(), n = {
				...this.logContext,
				integrationId: this.config.integrationId,
				httpStatus: e.status
			};
			if (H.isSessionNotFoundResponse(e.status, t)) this.logger.error("createEngagement()", R.CREATE_ENGAGEMENT_FAILED, n), H.dispatchSessionErrorEvent(this.conversationDetails.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger);
			else {
				if (Ft.isEngagementExistsResponse(e.status, t)) throw this.logger.debug("createEngagement()", "Engagement already exists, will attempt to join instead", n), new s(N.CREATION_FAILED_ENGAGEMENT_EXISTS);
				if (V.isConversationNotFoundResponse(e.status, t)) throw this.logger.warn("createEngagement()", "Conversation no longer exists, closing messaging channel", n), new s(N.CREATION_FAILED_CONVERSATION_NOT_FOUND);
				this.logger.error("createEngagement()", R.CREATE_ENGAGEMENT_FAILED, n);
			}
			throw new s(N.CREATE_DIALOG_FAILED);
		}
		let t = await e.json();
		this.defaultEngagement = new tn(this.conversationDetails.sessionId, this.conversationId, t, this.restController, this.config, this.loggerFactory, Ht.SELF), this.cannedMessagesController.setEngagementExists(!0), this.startListeningForEvents(this.defaultEngagement);
	}
	async joinEngagement(e, t, n = !1) {
		this.messagingChannelStateController.isSilence || n ? (this.messagingChannelStateController.transitionToResuming(), this.defaultEngagement = new tn(this.conversationDetails.sessionId, this.conversationId, t, this.restController, this.config, this.loggerFactory, e), await this.defaultEngagement.joinEngagement(), this.startListeningForEvents(this.defaultEngagement)) : this.logger.debug("joinEngagement()", "Engagement creation/join already in progress or completed. Aborting the join.", {
			...this.logContext,
			engagementId: this.defaultEngagement?.engagementId
		});
	}
	joinEngagementFailureCleanup(e) {
		this.clearDefaultEngagement(), ft(e) && e.detail === N.JOIN_FAILED_CONVERSATION_NOT_FOUND.detail ? this.closeMessagingChannel() : this.transitionToSilenceAndListen();
	}
	async handleEngagementExists() {
		let e;
		try {
			let n = await this.restController.send({
				methodType: D.GET,
				url: U.GET_SESSION.path(this.config.integrationId, this.conversationDetails.sessionId),
				isUrlFull: !1
			});
			if (e = n.status, !n.ok) {
				let e = await n.json();
				throw H.isSessionNotFoundResponse(n.status, e) && H.dispatchSessionErrorEvent(this.conversationDetails.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger), new s(N.GET_SESSION_FAILED);
			}
			let r = (await n.json()).engagements?.find(((e) => e.conversationId === this.conversationId));
			if (!r) throw new s(N.ENGAGEMENT_ABSENT_IN_CONVERSATION);
			await this.joinEngagement(Ht.REMOTE, (t = r, {
				engagementId: t.engagementId,
				engagementParameters: t.engagementParameters,
				dialogs: t.dialogs.map(Zt)
			}), !0);
			let i = r.dialogs?.[0].participants;
			i && this.informParticipantListUpdate(i);
		} catch (t) {
			throw this.logger.error("handleEngagementExists()", "Failed to join existing engagement.", {
				...this.logContext,
				httpStatus: e
			}, t), this.joinEngagementFailureCleanup(t), t;
		}
		var t;
	}
	handleEngagementError(e) {
		this.logger.warn("handleEngagementError()", R.REMOVING_ENGAGEMENT, {
			sessionId: this.conversationDetails.sessionId,
			engagementId: this.defaultEngagement?.engagementId,
			detail: e.detail
		}), this.concludeEngagement();
	}
	async handleCustomerMessage(e) {
		this.logger.debug("handleCustomerMessage()", "Received Message Delivered event", {
			...this.logContext,
			engagementId: this.defaultEngagement?.engagementId,
			messageId: e.messageId,
			correlationId: e._correlationId
		}), this.latestDeliveredMessageId = e.messageId;
		let t = e._correlationId;
		if (!t) return void this.logger.warn("handleCustomerMessage()", "Unable to correlate, no correlationId found in the Message event", {
			...this.logContext,
			messageId: e.messageId
		});
		if ((e.body.elementType === F.FILE || e.body.elementType === F.IMAGE) && e.attachments !== void 0 && this.isAlternativeAttachmentFlowEnabled) {
			let r = this.pendingAlternativeAttachmentMessages.get(t);
			if (r) {
				let t = {
					conversationId: (n = e).conversationId,
					messageId: n.messageId,
					parentMessageId: n.parentMessageId,
					receivedAt: n.receivedAt,
					lastUpdatedAt: n.lastUpdatedAt,
					body: n.body,
					senderParticipant: n.senderParticipant,
					attachments: n.attachments,
					_messageIndex: n._messageIndex
				};
				r.resolve(t), await this.handlePromiseSettlement(r.promise);
			}
		} else {
			let e = this.pendingMessages.get(t);
			e && await this.handlePromiseSettlement(e);
		}
		var n;
	}
	async handlePromiseSettlement(e, t, n) {
		try {
			await e, t && this.logger.debug("handlePromiseSettlement()", t, this.logContext);
		} catch (e) {
			n && this.logger.warn("handlePromiseSettlement()", n, this.logContext, e);
		}
	}
	handleNonCustomerMessage(e) {
		this.latestDeliveredMessageId = e.messageId;
		let t = e.senderParticipant?.participantType;
		if (t === h.BOT || t === h.SYSTEM) {
			let t = this.featureConfiguration.getRawPropertyOrDefault(vt.botname, "AI Assistant");
			t && (e.senderParticipant.displayName = t);
		}
	}
	queueDeliveryAckForMessages(e) {
		if (!V.isDeliveryNotificationEnabled(this.featureConfiguration)) return;
		let t = e.map(((e) => e)).filter(((e) => (e.participantType === h.AGENT || e.participantType === h.SYSTEM && !e.canned) && e.status !== gt.DELIVERED && e.status !== gt.FAILED && e.messageId)).map(((e) => e.messageId));
		this.deliveryAckQueue.add(t);
	}
	handleParticipantAddition(e) {
		this.logger.debug("handleParticipantAddition()", R.PARTICIPANT_ADDED, {
			sessionId: this.conversationDetails.sessionId,
			engagementId: this.defaultEngagement?.engagementId,
			participantId: e.participant?.participantId,
			participantType: e.participant?.participantType
		}), e.participant.participantType === h.CUSTOMER && (this.messagingChannelStateController.transitionToActive(), this.defaultEngagement?.updateEngagementStatus(zt.ACTIVE), this.defaultEngagement?.engagementId && this.defaultEngagement?.defaultDialog.dialogId && this.typingIndicators.setEngagementDetails(this.defaultEngagement.engagementId, this.defaultEngagement.defaultDialog.dialogId), this.defaultEngagement?.creationSource === Ht.REMOTE && (this.logger.debug("handleParticipantAddition()", "Fetching and dispatching missing messages for remotely created engagement.", {
			...this.logContext,
			engagementId: this.defaultEngagement.engagementId
		}), this.handleMissingMessagesForRemoteEngagement()));
	}
	handleParticipantRemoval(e) {
		this.logger.debug("handleParticipantRemoval()", R.PARTICIPANT_REMOVED, {
			sessionId: this.conversationDetails.sessionId,
			engagementId: this.defaultEngagement?.engagementId,
			participantId: e.participant?.participantId,
			participantType: e.participant?.participantType
		}), e.participant?.participantType === h.CUSTOMER && this.concludeEngagement();
	}
	async handleMissingMessagesForRemoteEngagement() {
		this.logger.debug("handleMissingMessagesForRemoteEngagement()", "Handling missing messages for remote engagement", {
			...this.logContext,
			engagementId: this.defaultEngagement?.engagementId
		});
		let e = await Bn.with(this.config, this.conversationId, this.conversationDetails.sessionId, this.defaultEngagement?.engagementId ?? "", this.restController, this.logger).fetchMessagesAsEventsUntil(this.latestDeliveredMessageId);
		e.reverse(), this.messagingEventProcessor.processEvents(e.map(((e) => ({
			type: e.eventType,
			event: e
		}))));
	}
	handleConversationSync(e) {
		this.logger.debug("handleConversationSync()", "Received Conversation Sync", this.logContext);
		let t = e.conversations.find(((e) => e.conversationId === this.conversationId));
		if (t) {
			if (this.defaultEngagement) this.logger.debug("handleConversationSync()", "Default Engagement already exists. Ignoring the event.", {
				...this.logContext,
				engagementId: this.defaultEngagement.engagementId
			});
			else if (t.engagements.length > 0) {
				this.logger.info("handleConversationSync()", "Joining remotely created engagement", {
					...this.logContext,
					engagementId: t.engagements[0].engagementId
				}), this.stopListeningSessionPoll(), this.conversationDetails.engagements.push(t.engagements[0]);
				let e = t.engagements[0].dialogs[0].participants;
				this.joinEngagement(Ht.REMOTE, t.engagements[0]).then((() => {
					e.length > 0 && this.informParticipantListUpdate(e);
				})).catch(((e) => {
					this.logger.error("handleConversationSync()", "Failed to join existing engagement.", {
						...this.logContext,
						engagementId: t.engagements[0].engagementId
					}, e), this.joinEngagementFailureCleanup(e);
				}));
			}
		} else this.logger.warn("handleConversationSync()", "Conversation not found in the event.", this.logContext);
	}
	handleEndConversationInitiated() {
		this.logger.debug("handleEndConversationInitiated()", "Received EndConversationInitiated event", this.logContext), this.messagingChannelStateController.isSilence && (this.stopListeningSessionPoll(), this.closeMessagingChannel());
	}
	informParticipantListUpdate(e) {
		let t = {
			participants: e.map(((e) => S(e.participantId, e.participantType, x.MESSAGING, e.displayName))),
			channel: x.MESSAGING,
			conversationId: this.conversationId,
			eventDate: /* @__PURE__ */ new Date()
		};
		this.messagingEventProcessor.processEvents([{
			type: y.PARTICIPANT_LIST_UPDATE,
			event: t
		}]);
	}
	async sendMessage(e) {
		this.assertSessionValidity(), this.assertConversationActive(), this.assertMessagingChannelOpen(), T(w.isNonNullableObject(e), B.Message.shouldBeStringOrObject, this.logger, "sendMessage()"), await this.initEngagement(), await this.messagingChannelStateController.activation, this.cannedMessagesController.stopAllTimedMessages(), this.inactivityTimerController.reportIntermittentActivity(), this.typingIndicators.notifySendMessageRequest();
		let t = k(R.BYTE_LENGTH_CORRELATION_ID);
		return e.getType() !== L.FILE && e.getType() !== L.IMAGE || !this.isAlternativeAttachmentFlowEnabled ? this.processMessage(e, t) : this.processAlternativeAttachmentMessage(e, t);
	}
	async prepareAttachmentMessage(e) {
		this.validateAttachmentMessage(e);
		let t = e.getAttachment(), n = await this.uploadAttachment(t);
		return {
			elementType: It.mapSendMessageElementTypeToElementType(e.getType()),
			elementText: {
				text: e.getText() === void 0 ? "" : e.getText(),
				textFormat: P.PLAINTEXT
			},
			richMediaPayload: { attachmentIds: [n.mediaId] }
		};
	}
	async prepareAndSendMessage(e, t) {
		let n;
		switch (e.getType()) {
			case L.TEXT:
				n = this.getTextMessageBody(e);
				break;
			case L.FILE:
			case L.IMAGE:
				n = await this.prepareAttachmentMessage(e);
				break;
			case L.POST_BACK:
				n = this.getPostBackMessageBody(e);
				break;
			case L.REPLY:
				n = this.getReplyMessageBody(e);
				break;
			case L.LOCATION:
				n = this.getLocationMessageBody(e);
				break;
			default: throw new s(N.INVALID_MESSAGE_ELEMENT_TYPE);
		}
		if (!this.defaultEngagement) throw this.logger.warn("processMessage()", N.ENGAGEMENT_NOT_FOUND.message, this.logContext), new s(N.SEND_MESSAGE_FAILED);
		try {
			let r = await this.defaultEngagement.sendMessage(n, t, this.cannedMessagesController.transformToCannedMessage(), e.getParentMessageId());
			return this.cannedMessagesController.clearAllMessages(), r;
		} catch (e) {
			throw this.logger.error("prepareAndSendMessage()", N.SEND_MESSAGE_FAILED.message, {
				sessionId: this.conversationDetails.sessionId,
				engagementId: this.defaultEngagement?.engagementId
			}, e), e instanceof Error && (ft(e) && e.code === M.SESSION_ENDED && H.dispatchSessionErrorEvent(this.conversationDetails.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger), e.name === "AbortError") ? new s(N.OPERATION_TIMEOUT, { cause: e }) : e;
		}
	}
	processMessage(e, t) {
		let n = this.prepareAndSendMessage(e, t);
		return this.pendingMessages.set(t, n), n.finally((() => {
			this.pendingMessages.delete(t);
		})), n;
	}
	prepareAlternativeAttachmentMessage(e) {
		if (e.getType() !== L.FILE && e.getType() !== L.IMAGE) throw new s(N.INVALID_MESSAGE_ELEMENT_TYPE);
		return this.validateAttachmentMessage(e), It.transformToAlternativeAttachmentBody(e);
	}
	async prepareAndSendAlternativeAttachmentMessage(e, t, n) {
		try {
			if (!this.defaultEngagement) throw this.logger.warn("prepareAndSendAlternativeAttachmentMessage()", N.ENGAGEMENT_NOT_FOUND.message, this.logContext), new s(N.SEND_MESSAGE_FAILED);
			let r = this.prepareAlternativeAttachmentMessage(e);
			await this.defaultEngagement.sendAlternativeAttachmentMessage(r, t);
			let i = setTimeout((() => {
				n.reject(new s(N.OPERATION_TIMEOUT)), this.logger.warn("prepareAndSendAlternativeAttachmentMessage()", "Alternative attachment message event arrival timed out", this.logContext);
			}), R.ALTERNATIVE_ATTACHMENT_EVENT_ARRIVAL_TIMEOUT);
			n.promise.finally((() => {
				clearTimeout(i);
			}));
		} catch (e) {
			this.logger.error("prepareAndSendAlternativeAttachmentMessage()", "Unexpected error while sending alternative attachment message", this.logContext, e), n.reject(e), ft(e) && e.code === M.SESSION_ENDED && H.dispatchSessionErrorEvent(this.conversationDetails.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger);
		}
	}
	processAlternativeAttachmentMessage(e, t) {
		let n = He();
		return this.pendingAlternativeAttachmentMessages.set(t, n), n.promise.finally((() => {
			this.pendingAlternativeAttachmentMessages.delete(t);
		})), this.prepareAndSendAlternativeAttachmentMessage(e, t, n), n.promise;
	}
	concludeEngagement(e = !1) {
		this.stopListeningForEvents(), this.clearDefaultEngagement(), this.typingIndicators.clearEngagementDetails(), this.cannedMessagesController.resetEngagementExists(), e || this.isConversationClosable ? this.closeMessagingChannel(e) : this.transitionToSilenceAndListen();
	}
	closeMessagingChannel(e = !1) {
		this.messagingChannelStateController.transitionToClosed(), this.unregisterCallbacks(), this.deactivateAllCapabilities(), e || this.channelRegistry.notifyConversationChannelClosure(R.MESSAGING_CHANNEL_NAME);
	}
	deactivateAllCapabilities() {
		this.typingIndicators.deactivate(), this.cannedMessagesController.deactivate();
	}
	transitionToSilenceAndListen() {
		this.messagingChannelStateController.transitionToSilence(), this.startListeningSessionPoll();
	}
	clearDefaultEngagement() {
		this.defaultEngagement?.updateEngagementStatus(zt.TERMINATED), this.lastEngagementId = this.defaultEngagement?.engagementId, this.defaultEngagement = void 0;
	}
	handleSdkShutdown(e) {
		this.logger.debug("handleSdkShutdown()", R.SDK_SHUTDOWN, {
			conversationId: this.conversationId,
			sessionId: e.sessionId,
			eventDate: e.eventDate,
			reason: e.reason,
			engagementId: this.defaultEngagement?.engagementId
		}), this.unregisterCallbacks(), this.concludeEngagement(!0);
	}
	addMessageArrivedListener(e) {
		return T(w.isFunction(e), "handler should be a function", this.logger, "addMessageArrivedListener()"), this.assertSessionValidity(), this.assertConversationActive(), this.assertMessagingChannelOpen(), this.eventDispatcher.addClientEventHandler(W.MESSAGE_ARRIVED, e, this.conversationId);
	}
	addMessageDeliveredListener(e) {
		return T(w.isFunction(e), "handler should be a function", this.logger, "addMessageDeliveredListener()"), this.assertSessionValidity(), this.assertConversationActive(), this.assertMessagingChannelOpen(), this.eventDispatcher.addClientEventHandler(W.MESSAGE_DELIVERED, e, this.conversationId);
	}
	removeMessageArrivedListener(e) {
		this.eventDispatcher.removeClientEventHandler(W.MESSAGE_ARRIVED, e, this.conversationId);
	}
	removeMessageDeliveredListener(e) {
		this.eventDispatcher.removeClientEventHandler(W.MESSAGE_DELIVERED, e, this.conversationId);
	}
	notifyUserTyping() {
		this.assertSessionValidity(), this.assertConversationActive(), this.assertMessagingChannelOpen(), this.typingIndicators.notifyUserTyping();
	}
	addTypingStartedListener(e) {
		return T(w.isFunction(e), "handler should be a function", this.logger, "addTypingStartedListener()"), this.assertSessionValidity(), this.assertConversationActive(), this.assertMessagingChannelOpen(), this.eventDispatcher.addClientEventHandler(W.INBOUND_TYPING_STARTED, e, this.conversationId);
	}
	removeTypingStartedListener(e) {
		this.eventDispatcher.removeClientEventHandler(W.INBOUND_TYPING_STARTED, e, this.conversationId);
	}
	addTypingStoppedListener(e) {
		return T(w.isFunction(e), "handler should be a function", this.logger, "addTypingStoppedListener()"), this.assertSessionValidity(), this.assertConversationActive(), this.assertMessagingChannelOpen(), this.eventDispatcher.addClientEventHandler(W.INBOUND_TYPING_STOPPED, e, this.conversationId);
	}
	removeTypingStoppedListener(e) {
		this.eventDispatcher.removeClientEventHandler(W.INBOUND_TYPING_STOPPED, e, this.conversationId);
	}
	async getMessages(e) {
		let t;
		this.assertSessionValidity(), this.inactivityTimerController.reportIntermittentActivity(), this.logger.debug("getMessages()", R.LIST_CONVERSATION_CALLED, {
			...this.logContext,
			pageSize: e
		}), this.validatePageSize(e);
		try {
			let n = await this.restController.send({
				methodType: U.LIST_CONVERSATION.requestType,
				url: U.LIST_CONVERSATION.path(this.config.integrationId, this.conversationId, this.conversationDetails.sessionId, this.defaultEngagement?.engagementId ?? "", 50, 1),
				isUrlFull: !1
			});
			if (t = n.status, !n.ok) {
				let e = await n.json();
				throw H.isSessionNotFoundResponse(n.status, e) && H.dispatchSessionErrorEvent(this.conversationDetails.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger), new s(N.LIST_CONVERSATION_MESSAGES_FAILED);
			}
			let r = await n.json();
			this.queueDeliveryAckForMessages(r.messages ?? []);
			let i = r.messages?.map(((e) => (e.conversationId ||= this.conversationId, en(e))));
			i?.reverse(), i && i.length !== 0 ? i = this.cannedMessagesController.replaceCannedMessageIds(i) : (i ||= [], i = this.cannedMessagesController.getWelcomeMessages());
			let a = r.links?.next;
			return this.latestDeliveredMessageId = i?.[0]?.messageId, new Xn(e, this.restController, i, a, this.conversationDetails.sessionId, this.conversationId, this.config.host, this.loggerFactory, this.queueDeliveryAckForMessages.bind(this));
		} catch (e) {
			throw e instanceof Error && this.logger.error("getMessages()", N.LIST_CONVERSATION_MESSAGES_FAILED.message, {
				...this.logContext,
				httpStatus: t
			}, e), e;
		}
	}
	async uploadAttachment(e) {
		this.logger.debug("uploadAttachment()", R.UPLOAD_ATTACHMENT_CALLED, {
			...this.logContext,
			engagementId: this.defaultEngagement?.engagementId
		});
		let t = e.type === void 0 || e.type === "" ? R.DEFAULT_MIME_TYPE : e.type, n = await this.generatePresignedUploadUrl(e.name, e.size, t);
		this.logger.debug("uploadAttachment()", R.PRESIGNED_UPLOAD_URL_FETCHED, {
			...this.logContext,
			engagementId: this.defaultEngagement?.engagementId
		});
		let r = n.presignedUrl, i = await new Un(this.loggerFactory, this.conversationDetails.sessionId, this.conversationId).upload(r, e, t);
		if (!i.ok) throw this.logger.error("uploadAttachment()", R.UPLOAD_ATTACHMENT_FAILED, {
			...this.logContext,
			integrationId: this.config.integrationId,
			httpStatus: i.status
		}), new s(N.UPLOAD_ATTACHMENT_FAILED);
		return await i.json();
	}
	async generatePresignedUploadUrl(e, t, n) {
		let r = await this.restController.send({
			methodType: U.GENERATE_UPLOAD_URL.requestType,
			url: U.GENERATE_UPLOAD_URL.path(this.config.integrationId, this.defaultEngagement.engagementId),
			requestBody: JSON.stringify({
				attachmentName: e,
				attachmentType: n,
				attachmentSize: t
			}),
			isUrlFull: !1
		});
		if (!r.ok) {
			this.logger.error("generatePresignedUploadUrl()", N.GENERATE_SIGNED_UPLOAD_URL_FAILED.message, {
				...this.logContext,
				integrationId: this.config.integrationId,
				httpStatus: r.status
			});
			let e = await r.json();
			throw H.isSessionNotFoundResponse(r.status, e) && H.dispatchSessionErrorEvent(this.conversationDetails.sessionId, m.SESSION_NOT_FOUND, this.messagingEventProcessor, this.logger), new s(N.GENERATE_SIGNED_UPLOAD_URL_FAILED);
		}
		return await r.json();
	}
	getTextMessageBody(e) {
		return this.validateMessageText(e.getText()), {
			elementType: It.mapSendMessageElementTypeToElementType(e.getType()),
			elementText: {
				textFormat: P.PLAINTEXT,
				text: e.getText()
			}
		};
	}
	getPostBackMessageBody(e) {
		return this.validatePostBackAction(e), {
			elementType: It.mapSendMessageElementTypeToElementType(e.getType()),
			elementText: {
				textFormat: P.PLAINTEXT,
				text: ""
			},
			richMediaPayload: { selectedAction: {
				type: I.POST_BACK,
				text: e.getActionText(),
				payload: e.getPayload()
			} }
		};
	}
	getReplyMessageBody(e) {
		return this.validateReplyAction(e), {
			elementType: It.mapSendMessageElementTypeToElementType(e.getType()),
			elementText: {
				textFormat: P.PLAINTEXT,
				text: ""
			},
			richMediaPayload: { selectedAction: {
				type: I.REPLY,
				text: e.getActionText(),
				payload: e.getPayload(),
				iconUrl: e.getIconUrl()
			} }
		};
	}
	getLocationMessageBody(e) {
		this.validateLocationMessage(e);
		let t = { coordinates: {
			lat: e.getLatitude(),
			long: e.getLongitude()
		} }, n;
		return (e.getName() || e.getAddress()) && (n = {}, e.getName() && (n.name = e.getName()), e.getAddress() && (n.address = e.getAddress())), n && (t.location = n), {
			elementType: It.mapSendMessageElementTypeToElementType(e.getType()),
			elementText: {
				text: "",
				textFormat: P.PLAINTEXT
			},
			richMediaPayload: t
		};
	}
	validateMessageTranscriptAvailability() {
		return this.conversationStatusChecker.getState() === E.CLOSED ? this.messagingChannelStateController.isActive ? N.OPERATION_ON_ACTIVE_CHANNEL : this.lastEngagementId === void 0 ? N.MESSAGING_TRANSCRIPT_UNAVAILABLE : void 0 : N.OPERATION_ON_OPEN_CONVERSATION;
	}
	assertMessagingTranscriptAvailability() {
		this.assertSessionValidity();
		let e = this.validateMessageTranscriptAvailability();
		if (e) throw new s(e);
	}
	get isMessagingTranscriptAvailable() {
		return this.assertSessionValidity(), this.validateMessageTranscriptAvailability() === void 0;
	}
	async getMessagingTranscriptDetails(e) {
		let t;
		this.assertMessagingTranscriptAvailability();
		try {
			if (this.downloadTranscriptUrlCache && this.downloadTranscriptFileNameCache) return this.logger.debug("getMessagingTranscriptDetails()", "Returning cached transcript URL", {
				...this.logContext,
				engagementId: this.lastEngagementId
			}), {
				downloadUrl: this.downloadTranscriptUrlCache,
				fileName: this.downloadTranscriptFileNameCache
			};
			let n = {
				conversationSessionId: this.lastEngagementId,
				timezone: e
			}, r = await this.restController.send({
				methodType: U.DOWNLOAD_TRANSCRIPT.requestType,
				url: U.DOWNLOAD_TRANSCRIPT.path(this.config.integrationId, this.conversationId),
				requestBody: JSON.stringify(n),
				isUrlFull: !1
			});
			if (t = r.status, !r.ok) throw new s(N.FAILED_TO_DOWNLOAD_TRANSCRIPT);
			let i = await r.json(), a = i.transcript.url, o = i.transcript.fileName;
			return this.downloadTranscriptUrlCache = a, this.downloadTranscriptFileNameCache = o, this.logger.debug("getMessagingTranscriptDetails()", "Cached transcript URL", {
				...this.logContext,
				engagementId: this.lastEngagementId
			}), {
				downloadUrl: a,
				fileName: o
			};
		} catch (e) {
			throw e instanceof Error && this.logger.error("getMessagingTranscriptDetails()", R.DOWNLOAD_TRANSCRIPT_FAILED, {
				...this.logContext,
				engagementId: this.lastEngagementId,
				httpStatus: t
			}, e), e;
		}
	}
}, Xn = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	get #u() {
		return {
			sessionId: this.#s,
			conversationId: this.#c
		};
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		let l = e;
		this.#s = i, this.#c = a, this.#n = 0, this.#t = t, this.#e = n, this.#i = r, this.#r = !1, this.getPageSize = () => l, this.#a = s("MessageIterator"), this.#o = o, this.#l = c, r !== "" && r !== void 0 || (this.#r = !0, this.#a.debug("constructor()", R.FETCHED_ALL_MESSAGES, this.#u));
	}
	getPageSize;
	get items() {
		this.#a.debug("items()", R.ITERATOR_ITEMS_CALLED, this.#u);
		let e = Math.min(this.#e.length, this.#n + this.getPageSize());
		return this.#e.slice(this.#n, e);
	}
	async next() {
		if (this.#a.debug("next()", R.ITERATOR_NEXT_CALLED, this.#u), !this.hasNext()) return [];
		let e = Math.max(0, this.#n - this.getPageSize());
		return this.#n = e, this.items;
	}
	async previous() {
		if (this.#a.debug("previous()", R.ITERATOR_PREVIOUS_CALLED, this.#u), !this.hasPrevious()) return [];
		let e = Math.min(this.#e.length, this.#n + this.getPageSize());
		for (; this.#e.length - e < this.getPageSize() && !this.#r;) try {
			this.#a.debug("previous()", R.FETCHING_ADDITIONAL_MESSAGES, this.#u);
			let e = await this.getNextMessages();
			if (!e.ok) throw new s(N.LIST_CONVERSATION_MESSAGES_FAILED, { metadata: { httpStatus: e.status } });
			let t = await e.json();
			this.#l?.(t.messages ?? []);
			let n = t.messages?.filter(((e) => !this.#e.some(((t) => t.messageId === e.messageId)) && !(e.messageIndex && this.#e[0]._messageIndex && e.messageIndex > this.#e[0]._messageIndex) && !(e.receivedAt && this.#e[0].receivedAt && new Date(e.receivedAt) > this.#e[0].receivedAt))).map(((e) => (e.conversationId ||= this.#c, en(e))));
			if (this.#e = [...this.#e, ...n], this.#i = t.links.next, this.#i === "") {
				this.#r = !0, this.#a.debug("previous()", R.FETCHED_ALL_MESSAGES, this.#u);
				break;
			}
		} catch (e) {
			throw this.#a.error("previous()", N.FETCHING_ADDITIONAL_MESSAGES_FAILED.message, this.#u, e), new s(N.FETCHING_ADDITIONAL_MESSAGES_FAILED, { cause: e });
		}
		return this.#n + this.getPageSize() <= this.#e.length && (this.#n = e), this.items;
	}
	async getNextMessages() {
		let e = await this.#t.send({
			methodType: D.GET,
			url: this.#o + this.#i,
			isUrlFull: !0
		});
		if (!e.ok) throw new s(N.FETCHING_ADDITIONAL_MESSAGES_FAILED, { metadata: { httpStatus: e.status } });
		return e;
	}
	hasNext() {
		return this.#a.debug("hasNext()", R.ITERATOR_HAS_NEXT_CALLED, this.#u), this.#n > 0;
	}
	hasPrevious() {
		return this.#a.debug("hasPrevious()", R.ITERATOR_HAS_PREVIOUS_CALLED, this.#u), !this.#r || this.#n + this.getPageSize() < this.#e.length;
	}
}, Zn = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	getParentMessageId() {
		return this.#t;
	}
	getType() {
		return this.#e;
	}
}, Qn = class extends Zn {
	#e;
	constructor(e, t) {
		super(L.TEXT, t), this.#e = e;
	}
	getText() {
		return this.#e;
	}
}, $n = class extends Zn {
	#e;
	#t;
	#n;
	constructor(e, t, n, r, i) {
		super(t, i), this.#e = e, this.#t = n, this.#n = r;
	}
	getActionType() {
		return this.#t;
	}
	getActionText() {
		return this.#n;
	}
	getPayload() {
		return this.#e;
	}
}, er = class extends $n {
	#e;
	constructor(e, t, n, r) {
		super(e, L.REPLY, mt.REPLY, t, r), this.#e = n;
	}
	getIconUrl() {
		return this.#e;
	}
}, tr = class extends Zn {
	#e;
	#t;
	constructor(e, t, n) {
		super((e.type === void 0 || e.type === "" ? R.DEFAULT_MIME_TYPE : e.type).split("/")[0] === R.MIME_TYPE_IMAGE ? L.IMAGE : L.FILE, n), this.#e = e, this.#t = t;
	}
	getText() {
		return this.#t;
	}
	getAttachment() {
		return this.#e;
	}
};
function nr(e = Ve) {
	return class extends e {
		#e;
		constructor(e) {
			super(e), this.#e = new Yn(e);
		}
		sendMessage(e) {
			return this.#e.sendMessage(e);
		}
		addMessageArrivedListener(e) {
			return this.#e.addMessageArrivedListener(e);
		}
		addMessageDeliveredListener(e) {
			return this.#e.addMessageDeliveredListener(e);
		}
		removeMessageArrivedListener(e) {
			return this.#e.removeMessageArrivedListener(e);
		}
		removeMessageDeliveredListener(e) {
			return this.#e.removeMessageDeliveredListener(e);
		}
		getMessages(e) {
			return this.#e.getMessages(e);
		}
		addTypingStartedListener(e) {
			return this.#e.addTypingStartedListener(e);
		}
		removeTypingStartedListener(e) {
			this.#e.removeTypingStartedListener(e);
		}
		addTypingStoppedListener(e) {
			return this.#e.addTypingStoppedListener(e);
		}
		removeTypingStoppedListener(e) {
			this.#e.removeTypingStoppedListener(e);
		}
		notifyUserTyping() {
			this.#e.notifyUserTyping();
		}
		get isMessagingTranscriptAvailable() {
			return this.#e.isMessagingTranscriptAvailable;
		}
		getMessagingTranscriptDetails(e) {
			return this.#e.getMessagingTranscriptDetails(e);
		}
	};
}
//#endregion
//#region src/ChatProvider.tsx
var rr = e(null), ir = class {
	fetchJwt;
	constructor(e) {
		this.fetchJwt = e;
	}
	onExpireWarning(e) {
		console.debug(`JWT expiring in ${e}ms. Fetching fresh token...`), this.fetchJwt().then((e) => j.setJwt(e)).catch((e) => console.error("Failed to refresh JWT on expiry warning:", e));
	}
	onExpire() {
		console.warn("JWT expired. Forcing token refresh..."), this.fetchJwt().then((e) => j.setJwt(e)).catch((e) => console.error("Failed to refresh JWT on expiry:", e));
	}
}, ar = ({ children: e, config: t }) => {
	let [r, o] = i(null), [s, c] = i([]), [l, u] = i(!0), [d, p] = i(null), [m, h] = i(null), [g, ee] = i([]), [te, ne] = i(!1);
	return n(() => {
		let e, n = !0;
		return (async () => {
			console.log("[ChatProvider] Starting initialization sequence...");
			try {
				u(!0), p(null);
				let r = t.fetchJwt;
				if (!r && t.auth && (r = async () => (await (await fetch("https://app1.showme.avaya.com/njf-api/iChatJWT", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-nicknode-access": "e67a08d9-6449-4369-8e51-4423d8e6be0f"
					},
					body: JSON.stringify({
						userId: t.auth.userId,
						userName: t.auth.userName,
						integrationId: t.integrationId,
						userIdentifiers: { emailAddresses: [t.auth.userId] }
					})
				})).json()).jwtToken), !r) throw Error("ChatEngine requires either a fetchJwt function or an auth configuration block.");
				console.log("[ChatProvider] Fetching initial JWT...");
				let i = await r();
				console.log("[ChatProvider] JWT fetched successfully. Token length:", i?.length);
				let a = new ir(r), s = nr();
				console.log(`[ChatProvider] Calling Avaya SDK init() on host: ${t.host}...`);
				let l = await j.init({
					host: t.host,
					integrationId: t.integrationId,
					token: i,
					jwtProvider: a,
					displayName: t.displayName,
					logLevel: t.logLevel || f.WARN,
					idleTimeoutDuration: 3e5,
					idleShutdownGraceTimeoutDuration: 6e4
				}, s);
				if (console.log("[ChatProvider] SDK Init successful! User session created."), console.log("[ChatProvider] Resolving active conversation..."), e = l.conversations[0] || await j.createConversation(s), console.log("[ChatProvider] Active conversation ready. ID:", e.id), !n) return;
				o(e), console.log("[ChatProvider] Fetching message history...");
				let d = await e.getMessages(15);
				if (console.log(`[ChatProvider] History fetched. Found ${d.items.length} messages.`), !n) return;
				h(d), c(d.items), console.log("[ChatProvider] Attaching conversation event listeners..."), e.addMessageArrivedListener((e) => {
					console.log("[ChatProvider] Message Arrived:", JSON.stringify(e, void 0, 4)), n && c((t) => [...t, e]);
				}), e.addMessageDeliveredListener((e) => {
					console.log("[ChatProvider] Message Delivered to Avaya:", JSON.stringify(e, void 0, 4));
				}), e.addTypingStartedListener((e) => {
					n && ee((t) => {
						let n = e.participant.displayName;
						return t.includes(n) ? t : [...t, n];
					});
				}), e.addTypingStoppedListener((e) => {
					n && ee((t) => t.filter((t) => t !== e.participant.displayName));
				}), console.log("[ChatProvider] Initialization complete. Connecting UI..."), n && u(!1);
			} catch (e) {
				console.error("[ChatProvider] Initialization FAILED at step:", e), n && (p(e?.message || "Failed to initialize Avaya SDK."), u(!1));
			}
			Ln.addEventStreamConnectedListener((e) => {
				console.log("[ChatProvider] Stream Connected: " + JSON.stringify(e, null, 2));
			}), Ln.addEventStreamFailedListener((e) => {
				console.log("[ChatProvider] Stream Failed: " + JSON.stringify(e, null, 2));
			}), Ln.addEventStreamClosedListener((e) => {
				console.log("[ChatProvider] Stream Closed: " + JSON.stringify(e, null, 2)), n && ne(!0);
			});
		})(), () => {
			console.log("[ChatProvider] Component unmounting. Terminating session..."), n = !1, e && typeof e.end == "function" && (console.log("[ChatProvider] Sending 'End Conversation' signal to Avaya Cloud..."), e.end().catch((e) => {
				e?.message && e.message.includes("Conversation is closed") ? console.log("[ChatProvider] Conversation was already closed by the agent. Clean exit.") : console.error("Failed to end conversation:", e);
			})), j.shutdown().catch((e) => console.error("[ChatProvider] Shutdown error:", e));
		};
	}, [t]), /* @__PURE__ */ a(rr.Provider, {
		value: {
			messages: s,
			isConnecting: l,
			connectionError: d,
			typingParticipants: g,
			isChatClosed: te,
			sendMessage: async (e) => {
				if (!r) return;
				let t = await r.sendMessage(new Qn(e));
				c((e) => [...e, t]), j.resetIdleTimeout();
			},
			sendAttachment: async (e, t = "") => {
				if (!r) return;
				let n = await r.sendMessage(new tr(e, t));
				c((e) => [...e, n]), j.resetIdleTimeout();
			},
			sendReply: async (e, t) => {
				if (!r) return;
				let n = await r.sendMessage(new er(e, t));
				c((e) => [...e, n]), j.resetIdleTimeout();
			},
			notifyTyping: () => {
				r?.notifyUserTyping(), j.resetIdleTimeout();
			},
			loadMoreHistory: async () => {
				if (m && m.hasPrevious()) {
					let e = await m.previous();
					c((t) => [...e, ...t]);
				}
			}
		},
		children: e
	});
}, or = () => {
	let e = t(rr);
	if (!e) throw Error("useChat must be used within a ChatProvider");
	return e;
}, sr = ({ chatRef: e, customerName: t, onMessage: r, onTypingChange: i }) => {
	let a = or();
	return n(() => {
		e.current = a;
	}, [a, e]), n(() => {
		if (a.messages.length === 0) return;
		let e = a.messages[a.messages.length - 1];
		r && r(e);
	}, [a.messages, r]), n(() => {
		if (!i) return;
		let e = a.typingParticipants || [];
		i(e.some((e) => e !== t), e);
	}, [
		a.typingParticipants,
		t,
		i
	]), null;
}, cr = "#0033A0", $ = "#D9E2EC", lr = "#102A43", ur = (e) => {
	let t = /(https?\\?:\/\/[^\s]+)/g;
	return e.split(t).map((e, n) => {
		if (e.match(t)) {
			let t = e.replace(/\\/g, "");
			return /* @__PURE__ */ a("a", {
				href: t,
				target: "_blank",
				rel: "noopener noreferrer",
				style: {
					color: "inherit",
					textDecoration: "underline",
					fontWeight: "500"
				},
				children: t
			}, n);
		}
		return e;
	});
}, dr = ({ payload: e, onAction: t, theme: n }) => {
	if (!e.startsWith("RICH! ")) return /* @__PURE__ */ a("div", { children: e });
	let r = e.replace("RICH! ", "").split("|"), i = n?.bubbles?.userBackground || cr;
	return /* @__PURE__ */ a("div", {
		style: {
			backgroundColor: "#fff",
			padding: "14px",
			borderRadius: "4px",
			maxWidth: "100%",
			boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
			border: `1px solid ${$}`
		},
		children: r.map((e, n) => {
			if (e.startsWith("text:")) return /* @__PURE__ */ a("p", {
				style: {
					margin: "0 0 10px 0",
					fontSize: "13px",
					color: "#111",
					lineHeight: "1.4"
				},
				children: e.replace("text:", "").trim().replace(/^'|'$/g, "")
			}, n);
			if (e.startsWith("address:")) {
				let t = e.replace("address:", "").trim().split(",");
				return /* @__PURE__ */ a("table", {
					style: {
						width: "100%",
						fontSize: "12px",
						marginBottom: "12px"
					},
					children: /* @__PURE__ */ a("tbody", { children: t.map((e, t) => {
						let [n, r] = e.split(":");
						return /* @__PURE__ */ o("tr", { children: [/* @__PURE__ */ o("td", {
							style: {
								padding: "3px 0",
								fontWeight: "600",
								color: "#666",
								width: "80px"
							},
							children: [n.trim(), ":"]
						}), /* @__PURE__ */ a("td", {
							style: {
								padding: "3px 0",
								color: "#111"
							},
							children: r.trim().replace(/^'|'$/g, "")
						})] }, t);
					}) })
				}, n);
			}
			if (e.startsWith("responseBox:")) {
				let r = e.match(/\[(.*?)\]/);
				return r ? /* @__PURE__ */ a("div", {
					style: {
						display: "flex",
						gap: "8px"
					},
					children: r[1].split(";").map((e, n) => {
						let r = e.match(/label:\s*'(.*?)'/), o = e.match(/tag:\s*'(.*?)'/);
						return !r || !o ? null : /* @__PURE__ */ a("button", {
							onClick: () => t(o[1]),
							style: {
								flex: 1,
								padding: "10px",
								backgroundColor: i,
								color: "white",
								border: "none",
								borderRadius: "4px",
								fontSize: "12px",
								fontWeight: "bold",
								cursor: "pointer"
							},
							children: r[1]
						}, n);
					})
				}, n) : null;
			}
			return null;
		})
	});
};
function fr({ closeChat: e, theme: t, autoStartMessage: s }) {
	let { messages: c, isConnecting: l, connectionError: u, sendMessage: d, notifyTyping: f, sendAttachment: p, isChatClosed: m, sendReply: h, typingParticipants: g } = or(), ee = t?.header?.backgroundColor || cr, te = t?.header?.textColor || "white", ne = t?.header?.title || "Altamino Assistant", re = t?.header?.logoText || "ALT", ie = t?.bubbles?.userBackground || cr, ae = t?.bubbles?.userText || "white", oe = t?.bubbles?.agentBackground || "#fff", se = t?.bubbles?.agentText || lr, ce = t?.bubbles?.richMediaBackground || "#e8eaf6", le = t?.bubbles?.richMediaButtonColor || "#958fd6", ue = t?.input?.placeholderText || "Type message to Altamino...", de = t?.input?.sendButtonBackground || cr, fe = t?.input?.sendButtonText || "white", [_, v] = i(""), y = r(null), b = r(null), pe = r(!1);
	n(() => {
		!l && !pe.current && s && (c.length === 0 && (console.log("[ChatWindow] Auto-starting workflow with:", s), d(s)), pe.current = !0);
	}, [
		l,
		c,
		s,
		d
	]);
	let me = async (e) => {
		let t = e.target.files?.[0];
		if (t) try {
			await p(t);
		} catch (e) {
			console.error("Failed to send file:", e);
		} finally {
			b.current && (b.current.value = "");
		}
	};
	n(() => {
		y.current?.scrollIntoView({ behavior: "smooth" });
	}, [c]);
	let he = (e) => {
		let t = e || _;
		t.trim() && (d(t), e || v(""));
	};
	return /* @__PURE__ */ o("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			backgroundColor: "#F8FAFC"
		},
		children: [
			/* @__PURE__ */ o("div", {
				style: {
					padding: "16px",
					background: ee,
					color: te,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				},
				children: [/* @__PURE__ */ o("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "10px"
					},
					children: [/* @__PURE__ */ a("div", {
						style: {
							width: "32px",
							height: "32px",
							borderRadius: "4px",
							background: te,
							color: ee,
							fontWeight: "bold",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "14px"
						},
						children: re
					}), /* @__PURE__ */ o("div", { children: [/* @__PURE__ */ a("div", {
						style: {
							fontWeight: "bold",
							fontSize: "13px"
						},
						children: ne
					}), /* @__PURE__ */ o("div", {
						style: {
							fontSize: "11px",
							opacity: .9,
							display: "flex",
							alignItems: "center",
							gap: "4px"
						},
						children: [/* @__PURE__ */ a("span", { style: {
							width: "6px",
							height: "6px",
							borderRadius: "50%",
							backgroundColor: l ? "#ccc" : "#10B981"
						} }), l ? "Connecting..." : u ? "Error" : "Online"]
					})] })]
				}), /* @__PURE__ */ a("button", {
					onClick: e,
					style: {
						background: "none",
						border: "none",
						color: te,
						fontSize: "24px",
						cursor: "pointer",
						lineHeight: "1"
					},
					children: "×"
				})]
			}),
			/* @__PURE__ */ o("div", {
				style: {
					flex: 1,
					overflowY: "auto",
					padding: "15px",
					display: "flex",
					flexDirection: "column",
					gap: "12px"
				},
				children: [
					u && /* @__PURE__ */ a("div", {
						style: {
							color: "red",
							fontSize: "12px",
							textAlign: "center"
						},
						children: u
					}),
					c.map((e, n) => {
						let r = e.body?.elementText?.text || e.text || "", i = e.attachments || [], s = e.body?.richMediaPayload?.actions || [], c = typeof r == "string" && r.startsWith("RICH! "), l = e.senderParticipant?.participantType === "CUSTOMER" || e.isLocal, u = s.length > 0;
						return /* @__PURE__ */ o("div", {
							style: {
								alignSelf: l ? "flex-end" : "flex-start",
								maxWidth: "85%",
								display: "flex",
								flexDirection: "column",
								alignItems: l ? "flex-end" : "flex-start",
								marginBottom: "12px"
							},
							children: [i.map((e) => /* @__PURE__ */ a("div", {
								style: { marginBottom: r || u ? "6px" : "0" },
								children: e.contentType?.startsWith("image/") ? /* @__PURE__ */ a("img", {
									src: e.attachmentUrl,
									alt: e.attachmentName,
									style: {
										maxWidth: "100%",
										maxHeight: "250px",
										borderRadius: "6px",
										objectFit: "contain",
										border: l ? "none" : `1px solid ${$}`
									}
								}) : /* @__PURE__ */ o("a", {
									href: e.attachmentUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									style: {
										display: "inline-block",
										padding: "8px",
										backgroundColor: l ? "rgba(255,255,255,0.2)" : "#f0f0f0",
										borderRadius: "6px",
										color: l ? ae : "#0056b3",
										textDecoration: "none",
										fontSize: "13px",
										border: l ? "none" : `1px solid ${$}`
									},
									children: ["📎 ", e.attachmentName]
								})
							}, e.attachmentId)), (r || u) && /* @__PURE__ */ o("div", {
								style: {
									backgroundColor: l ? ie : u ? ce : oe,
									color: l ? ae : se,
									padding: "12px",
									borderRadius: "6px",
									fontSize: "13px",
									boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
									border: l ? "none" : `1px solid ${$}`,
									lineHeight: "1.45",
									minWidth: u ? "200px" : "auto"
								},
								children: [
									r && !c && /* @__PURE__ */ a("div", {
										style: { marginBottom: u ? "12px" : "0" },
										children: ur(r)
									}),
									r && c && /* @__PURE__ */ a(dr, {
										payload: r,
										onAction: (e) => he(e),
										theme: t
									}),
									u && /* @__PURE__ */ a("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: "8px"
										},
										children: s.map((e, t) => /* @__PURE__ */ a("button", {
											onClick: () => h(e.payload, e.text),
											disabled: m,
											style: {
												backgroundColor: le,
												color: "white",
												border: "none",
												borderRadius: "4px",
												padding: "10px 16px",
												cursor: m ? "not-allowed" : "pointer",
												fontWeight: "500",
												width: "100%",
												transition: "opacity 0.2s"
											},
											onMouseOver: (e) => e.currentTarget.style.opacity = "0.8",
											onMouseOut: (e) => e.currentTarget.style.opacity = "1",
											children: e.text
										}, t))
									})
								]
							})]
						}, e.messageId || n);
					}),
					/* @__PURE__ */ a("div", { ref: y })
				]
			}),
			g.length > 0 && !m && /* @__PURE__ */ o("div", {
				style: {
					padding: "8px 16px",
					fontSize: "12px",
					color: "#888",
					fontStyle: "italic",
					backgroundColor: "#f9f9f9",
					borderTop: `1px solid ${$}`
				},
				children: [
					g.join(", "),
					" ",
					g.length > 1 ? "are" : "is",
					" typing..."
				]
			}),
			m && /* @__PURE__ */ a("div", {
				style: {
					padding: "10px",
					textAlign: "center",
					backgroundColor: "#f8f9fa",
					color: "#6c757d",
					fontSize: "12px",
					borderTop: `1px solid ${$}`
				},
				children: "Chat ended by agent."
			}),
			/* @__PURE__ */ o("div", {
				style: {
					display: "flex",
					padding: "12px",
					borderTop: m ? "none" : `1px solid ${$}`,
					backgroundColor: m ? "#f8f9fa" : "#fff",
					alignItems: "center"
				},
				children: [
					/* @__PURE__ */ a("input", {
						type: "file",
						ref: b,
						onChange: me,
						style: { display: "none" },
						disabled: m
					}),
					/* @__PURE__ */ a("button", {
						onClick: () => b.current?.click(),
						disabled: l || m,
						style: {
							background: "none",
							border: "none",
							cursor: l || m ? "not-allowed" : "pointer",
							padding: "8px 12px",
							fontSize: "18px",
							color: l || m ? "#ccc" : de
						},
						title: "Attach a file",
						children: "📎"
					}),
					/* @__PURE__ */ a("input", {
						type: "text",
						value: _,
						onChange: (e) => {
							v(e.target.value), f();
						},
						onKeyDown: (e) => {
							e.key === "Enter" && he();
						},
						placeholder: m ? "Chat has ended" : ue,
						disabled: l || m,
						style: {
							flex: 1,
							padding: "10px",
							border: `1px solid ${$}`,
							borderRadius: "4px",
							outline: "none",
							fontSize: "14px",
							backgroundColor: m ? "#e9ecef" : "#fff",
							fontFamily: "inherit"
						}
					}),
					/* @__PURE__ */ a("button", {
						onClick: () => he(),
						disabled: !_.trim() || l || m,
						style: {
							marginLeft: "12px",
							padding: "10px 16px",
							border: "none",
							borderRadius: "4px",
							fontWeight: "bold",
							fontFamily: "inherit",
							cursor: l || m || !_.trim() ? "not-allowed" : "pointer",
							backgroundColor: l || m || !_.trim() ? "#ccc" : de,
							color: fe
						},
						children: "SEND"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/ChatBubble.tsx
var pr = ({ onClick: e, theme: t }) => /* @__PURE__ */ a("button", {
	onClick: e,
	style: {
		width: "60px",
		height: "60px",
		borderRadius: "50%",
		backgroundColor: t?.header?.backgroundColor || "#0033a0",
		color: "#fff",
		border: "none",
		boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		transition: "transform 0.2s"
	},
	onMouseOver: (e) => e.currentTarget.style.transform = "scale(1.05)",
	onMouseOut: (e) => e.currentTarget.style.transform = "scale(1)",
	children: /* @__PURE__ */ a("svg", {
		width: "28",
		height: "28",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ a("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
	})
}), mr = {
	header: {
		title: "Altamino Assistant",
		logoText: "ALT",
		backgroundColor: "#0033a0",
		textColor: "#ffffff"
	},
	bubbles: {
		userBackground: "#0033a0",
		userText: "#ffffff",
		agentBackground: "#ffffff",
		agentText: "#333333",
		richMediaBackground: "#e8eaf6",
		richMediaButtonColor: "#958fd6"
	},
	input: {
		placeholderText: "Type message...",
		sendButtonBackground: "#0033a0",
		sendButtonText: "#ffffff"
	},
	typography: {
		fontFamily: "inherit",
		baseFontSize: "14px"
	}
}, hr = ({ config: e, theme: t, isOpen: n, onOpen: r, onClose: s, showBubble: c = !0, children: l }) => {
	let [u, d] = i(!1), f = n === void 0 ? u : n, p = () => {
		d(!0), r && r();
	}, m = () => {
		d(!1), s && s();
	}, h = {
		...mr,
		...t,
		header: {
			...mr.header,
			...t?.header
		},
		bubbles: {
			...mr.bubbles,
			...t?.bubbles
		},
		input: {
			...mr.input,
			...t?.input
		},
		typography: {
			...mr.typography,
			...t?.typography
		}
	};
	return /* @__PURE__ */ a("div", {
		style: {
			position: "fixed",
			bottom: "20px",
			right: "20px",
			zIndex: 9999,
			fontFamily: h.typography.fontFamily
		},
		children: f ? /* @__PURE__ */ a("div", {
			style: {
				width: "400px",
				height: "600px",
				display: "flex",
				flexDirection: "column",
				boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
				borderRadius: "8px",
				overflow: "hidden",
				backgroundColor: "#fff",
				border: `1px solid ${h.header.backgroundColor}`
			},
			children: /* @__PURE__ */ o(ar, {
				config: e,
				children: [/* @__PURE__ */ a(fr, {
					closeChat: m,
					theme: h,
					autoStartMessage: e.autoStartMessage
				}), l]
			})
		}) : c && /* @__PURE__ */ a(pr, {
			onClick: p,
			theme: h
		})
	});
};
//#endregion
export { hr as AvayaChatWidget, sr as ChatBridge, pr as ChatBubble, ar as ChatProvider, fr as ChatWindow, or as useChat };
