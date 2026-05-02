module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/ajudaPrudente/ajudaprudente/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
(()=>{
    const e = new Error("Cannot find module '../app/generated/prisma/client'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ajudaPrudente/ajudaprudente/node_modules/@prisma/adapter-pg/dist/index.mjs [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaPg"]({
    connectionString: process.env.DATABASE_URL
});
const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
const __TURBOPACK__default__export__ = prisma;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/ajudaPrudente/ajudaprudente/app/lib/Usuario.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Usuario",
    ()=>Usuario
]);
class Usuario {
    constructor(idUsuario, nome, email, senha, telefone, tipoUsuario){}
}
}),
"[project]/ajudaPrudente/ajudaprudente/app/lib/Organizador.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Organizador",
    ()=>Organizador
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ajudaPrudente/ajudaprudente/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$app$2f$lib$2f$Usuario$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ajudaPrudente/ajudaprudente/app/lib/Usuario.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class Organizador extends __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$app$2f$lib$2f$Usuario$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Usuario"] {
    idorganizador;
    nome;
    email;
    senha;
    telefone;
    CNPJ;
    constructor(nome, email, senha, telefone, tipoUsuario, CNPJ){
        super(undefined, nome, email, senha, telefone, tipoUsuario);
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.CNPJ = CNPJ;
    }
    async storeOnDb(endereco) {
        if (this.idorganizador === undefined) {
            const lastOrganizador = await __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].organizador.findFirst({
                select: {
                    idorganizador: true
                },
                orderBy: {
                    idorganizador: "desc"
                }
            });
            this.idorganizador = (lastOrganizador?.idorganizador ?? 0) + 1;
        }
        const created = await __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].organizador.create({
            data: {
                idorganizador: this.idorganizador,
                nome: this.nome,
                senha: this.senha,
                email: this.email,
                criado: new Date(),
                endereco,
                cnpj: String(this.CNPJ),
                telefone: String(this.telefone)
            }
        });
        this.idorganizador = created.idorganizador;
        return created;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/ajudaPrudente/ajudaprudente/app/lib/TipoUsuario.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TipoUsuario",
    ()=>TipoUsuario
]);
var TipoUsuario = /*#__PURE__*/ function(TipoUsuario) {
    TipoUsuario[TipoUsuario["Organizador"] = 0] = "Organizador";
    TipoUsuario[TipoUsuario["Voluntario"] = 1] = "Voluntario";
    return TipoUsuario;
}({});
}),
"[project]/ajudaPrudente/ajudaprudente/app/api/organizador/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$app$2f$lib$2f$Organizador$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ajudaPrudente/ajudaprudente/app/lib/Organizador.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$app$2f$lib$2f$TipoUsuario$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ajudaPrudente/ajudaprudente/app/lib/TipoUsuario.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$app$2f$lib$2f$Organizador$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$app$2f$lib$2f$Organizador$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function isValidPayload(payload) {
    if (typeof payload !== "object" || payload === null) return false;
    const body = payload;
    return typeof body.nome === "string" && body.nome.trim().length > 0 && typeof body.email === "string" && body.email.trim().length > 0 && typeof body.senha === "string" && body.senha.trim().length > 0 && typeof body.telefone === "number" && Number.isFinite(body.telefone) && typeof body.cnpj === "number" && Number.isFinite(body.cnpj) && typeof body.endereco === "number" && Number.isInteger(body.endereco);
}
async function POST(request) {
    const payload = await request.json();
    if (!isValidPayload(payload)) {
        return Response.json({
            error: "Invalid request body for organizador creation."
        }, {
            status: 400
        });
    }
    const organizador = new __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$app$2f$lib$2f$Organizador$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Organizador"](payload.nome, payload.email, payload.senha, payload.telefone, __TURBOPACK__imported__module__$5b$project$5d2f$ajudaPrudente$2f$ajudaprudente$2f$app$2f$lib$2f$TipoUsuario$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TipoUsuario"].Organizador, payload.cnpj);
    const created = await organizador.storeOnDb(payload.endereco);
    return Response.json(created, {
        status: 201
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__104w4.q._.js.map