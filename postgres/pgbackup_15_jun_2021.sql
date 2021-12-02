--
-- PostgreSQL database cluster dump
--

-- Started on 2021-06-15 17:53:20 -05

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE admin;
ALTER ROLE admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md50a96a0555d7003df560237f9e2447ea2';
CREATE ROLE admin12345;
ALTER ROLE admin12345 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md50bcb22cd3d2aaec65f7cb4f209ccf928';
CREATE ROLE administrator;
ALTER ROLE administrator WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md566f2c92e2ec8a966d69b88bcb61e263c';
CREATE ROLE carlosromero;
ALTER ROLE carlosromero WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5fb94af1e8aad3fa93f723967f73c87c8';
CREATE ROLE jhondoe009;
ALTER ROLE jhondoe009 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md54f8c9f8ccd48f9aff16c60ebb941205e';
CREATE ROLE jhondoe112;
ALTER ROLE jhondoe112 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5ae3c685e2e85badf9d748c5f985c1845';
CREATE ROLE jhondoe113;
ALTER ROLE jhondoe113 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md51f7d8c664435e64e1aef78f41e052677';
CREATE ROLE jhondoe114;
ALTER ROLE jhondoe114 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md59855302cf08970c723816df3627ffd72';
CREATE ROLE jhondoe115;
ALTER ROLE jhondoe115 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md53e568c13adf374b93f2fed91bd23378d';
CREATE ROLE jhondoe116;
ALTER ROLE jhondoe116 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md50d72820e0a84c0cc63c9697d97f601df';
CREATE ROLE jhondoe117;
ALTER ROLE jhondoe117 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5a854422b7272117905f85681ab8e9e0d';
CREATE ROLE jhondoe118;
ALTER ROLE jhondoe118 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md51563af94645d277efd2e7eafadc42e83';
CREATE ROLE jhondoe119;
ALTER ROLE jhondoe119 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md519adb27cddefd3d1711ece6ee59464af';
CREATE ROLE jhondoe120;
ALTER ROLE jhondoe120 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md58876f9224ec9051a6fdc028d3ec35bf0';
CREATE ROLE jhondoe121;
ALTER ROLE jhondoe121 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5be88d51ae359a9796220825bfc0aa3e0';
CREATE ROLE jhondoe122;
ALTER ROLE jhondoe122 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md561dd6a58bfc8d4e05a846e8471262a2b';
CREATE ROLE jhondoe123;
ALTER ROLE jhondoe123 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5f0e36b12215d364582cf9f97bffc1a08';
CREATE ROLE jhondoe124;
ALTER ROLE jhondoe124 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md59c6a27bfa45d64542440e3fa7c4f7109';
CREATE ROLE jhondoe2001;
ALTER ROLE jhondoe2001 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5a3de527c7fa178de6371226f3014db53';
CREATE ROLE jhondoe2002;
ALTER ROLE jhondoe2002 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5787d736adb5252761e9f2e62cf6b55aa';
CREATE ROLE jhondoe701;
ALTER ROLE jhondoe701 WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md50cceeb393e32e72b04bfd91c851747c9';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md5d1797d3cbdcd13cdcc59477d72a14bdd';
CREATE ROLE reademail;
ALTER ROLE reademail WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5ab189eadc8c206855bf22be6034ede9b';
CREATE ROLE testuser1;
ALTER ROLE testuser1 WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5d04be3727b50e14362ff94a618130e1b';
COMMENT ON ROLE testuser1 IS 'testuser para login';
CREATE ROLE user110;
ALTER ROLE user110 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5dbfecaf622021f683d2e80b9f8a110dd';
CREATE ROLE user111;
ALTER ROLE user111 WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5d55121ddccad6f199f231f1aa8baf722';
CREATE ROLE usuario;
ALTER ROLE usuario WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md506cffa240623d10d981e032e4c4a3c40';






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

-- Started on 2021-06-15 17:53:20 -05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2021-06-15 17:53:20 -05

--
-- PostgreSQL database dump complete
--

--
-- Database "minghos" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

-- Started on 2021-06-15 17:53:20 -05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2993 (class 1262 OID 16384)
-- Name: minghos; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE minghos WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE minghos OWNER TO postgres;

\connect minghos

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16412)
-- Name: d_param; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.d_param (
    id bigint NOT NULL,
    org bigint,
    param character varying(100),
    value character varying(250)
);


ALTER TABLE public.d_param OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16410)
-- Name: d_param_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.d_param_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.d_param_id_seq OWNER TO postgres;

--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 202
-- Name: d_param_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.d_param_id_seq OWNED BY public.d_param.id;


--
-- TOC entry 207 (class 1259 OID 16431)
-- Name: d_uconfig; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.d_uconfig (
    id bigint NOT NULL,
    org bigint,
    "user" character varying(100),
    password character varying(250),
    lang character varying(5)
);


ALTER TABLE public.d_uconfig OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16429)
-- Name: d_uconfig_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.d_uconfig_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.d_uconfig_id_seq OWNER TO postgres;

--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 206
-- Name: d_uconfig_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.d_uconfig_id_seq OWNED BY public.d_uconfig.id;


--
-- TOC entry 205 (class 1259 OID 16423)
-- Name: s_system; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.s_system (
    id bigint NOT NULL,
    active boolean,
    nuser integer,
    maxuser integer,
    nit bigint,
    org character varying(250),
    email character varying(250),
    version character varying(5),
    token character varying(250),
    fecharegistro date
);


ALTER TABLE public.s_system OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16421)
-- Name: s_system_org_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.s_system_org_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.s_system_org_seq OWNER TO postgres;

--
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 204
-- Name: s_system_org_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.s_system_org_seq OWNED BY public.s_system.id;


--
-- TOC entry 2845 (class 2604 OID 16415)
-- Name: d_param id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.d_param ALTER COLUMN id SET DEFAULT nextval('public.d_param_id_seq'::regclass);


--
-- TOC entry 2847 (class 2604 OID 16434)
-- Name: d_uconfig id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.d_uconfig ALTER COLUMN id SET DEFAULT nextval('public.d_uconfig_id_seq'::regclass);


--
-- TOC entry 2846 (class 2604 OID 16426)
-- Name: s_system id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.s_system ALTER COLUMN id SET DEFAULT nextval('public.s_system_org_seq'::regclass);


--
-- TOC entry 2983 (class 0 OID 16412)
-- Dependencies: 203
-- Data for Name: d_param; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.d_param (id, org, param, value) FROM stdin;
1	1	database	minghos
2	1	host	localhost
3	1	port	27017
4	1	email_from	soporte@xsitecompany.net
6	1	email_port	587
7	1	email_secure	TRUE
8	1	email_requiretls	TRUE
9	1	email_service	gmail
10	1	email_password	20001015006
99	33	host	localhost
5	1	email_host	xsitecompany.net
100	33	port	27017
101	34	database	minghos34
102	34	host	localhost
103	34	port	27017
104	35	database	minghos35
105	35	host	localhost
106	35	port	27017
107	36	host	localhost
108	36	port	27017
109	36	database	minghos36
110	37	database	minghos37
111	37	host	localhost
38	13	database	minghos13
39	13	host	mongodb://localhost:
40	13	port	27017
41	14	database	minghos14
42	14	host	localhost
43	14	port	27017
44	15	host	localhost
45	15	database	minghos15
46	15	port	27017
47	16	port	27017
48	16	host	localhost
49	16	database	minghos16
50	17	database	minghos17
51	17	host	localhost
52	17	port	27017
53	18	database	minghos18
54	18	port	27017
55	18	host	localhost
56	19	database	minghos19
57	19	port	27017
58	19	host	localhost
59	20	database	minghos20
60	20	host	localhost
61	20	port	27017
62	21	database	minghos21
63	21	host	localhost
64	21	port	27017
65	22	database	minghos22
66	22	host	localhost
67	22	port	27017
68	23	database	minghos23
69	23	host	localhost
70	23	port	27017
71	24	host	localhost
72	24	port	27017
73	24	database	minghos24
74	25	database	minghos25
75	25	host	localhost
76	25	port	27017
77	26	database	minghos26
78	26	port	27017
79	26	host	localhost
80	27	database	minghos27
81	27	host	localhost
82	27	port	27017
83	28	database	minghos28
84	28	host	localhost
85	28	port	27017
87	29	host	localhost
86	29	database	minghos29
88	29	port	27017
89	30	host	localhost
90	30	database	minghos30
91	30	port	27017
92	31	port	27017
93	31	database	minghos31
94	31	host	localhost
95	32	host	localhost
96	32	database	minghos32
97	32	port	27017
98	33	database	minghos33
112	38	database	minghos38
113	38	host	localhost
114	38	port	27017
115	39	database	minghos39
116	39	host	localhost
117	39	port	27017
118	40	database	minghos40
119	40	host	localhost
120	40	port	27017
121	41	database	minghos41
122	41	host	localhost
123	41	port	27017
124	42	database	minghos42
125	42	host	localhost
126	42	port	27017
127	43	database	minghos43
128	43	host	localhost
129	43	port	27017
130	45	database	minghos45
131	45	port	27017
132	45	host	localhost
133	46	database	minghos46
134	46	host	localhost
135	46	port	27017
136	47	database	minghos47
137	47	host	localhost
138	47	port	27017
139	48	database	minghos48
140	48	port	27017
141	48	host	localhost
142	49	host	localhost
143	49	port	27017
144	49	database	minghos49
145	50	database	minghos50
146	50	host	localhost
147	50	port	27017
148	51	host	localhost
149	51	database	minghos51
150	51	port	27017
151	52	database	minghos52
152	52	host	localhost
153	52	port	27017
154	53	database	minghos53
156	53	port	27017
307	105	port	27017
157	54	database	minghos54
184	63	database	minghos63
188	64	host	localhost
213	72	port	27017
214	73	host	localhost
217	74	host	localhost
221	75	host	localhost
223	76	database	minghos76
226	77	database	minghos77
244	83	port	27017
262	89	database	minghos89
268	91	database	minghos91
308	105	host	localhost
319	109	database	minghos109
322	110	database	minghos110
328	112	database	minghos112
158	54	host	localhost
185	63	host	localhost
187	64	database	minghos64
212	72	host	localhost
215	73	database	minghos73
218	74	port	27017
222	75	port	27017
224	76	host	localhost
228	77	port	27017
246	83	host	localhost
263	89	host	localhost
269	91	host	localhost
309	105	database	minghos105
320	109	port	27017
323	110	port	27017
329	112	host	192.168.0.90
159	54	port	27017
186	63	port	27017
189	64	port	27017
211	72	database	minghos72
216	73	port	27017
219	74	database	minghos74
220	75	database	minghos75
225	76	port	27017
227	77	host	localhost
245	83	database	minghos83
264	89	port	27017
270	91	port	27017
310	106	database	minghos106
321	109	host	192.168.0.90
324	110	host	192.168.0.90
330	112	port	27017
160	55	database	minghos55
190	65	database	minghos65
230	78	host	localhost
247	84	host	localhost
265	90	database	minghos90
271	92	database	minghos92
311	106	host	localhost
325	111	database	minghos111
161	55	host	localhost
191	65	host	localhost
229	78	database	minghos78
248	84	database	minghos84
266	90	host	localhost
272	92	port	27017
312	106	port	27017
326	111	host	192.168.0.90
162	55	port	27017
192	65	port	27017
231	78	port	27017
249	84	port	27017
267	90	port	27017
273	92	host	localhost
313	107	database	minghos107
327	111	port	27017
163	56	database	minghos56
193	66	host	localhost
232	79	database	minghos79
250	85	database	minghos85
274	93	port	27017
314	107	host	localhost
164	56	host	localhost
194	66	database	minghos66
233	79	port	27017
251	85	port	27017
275	93	host	localhost
315	107	port	27017
165	56	port	27017
195	66	port	27017
234	79	host	localhost
252	85	host	localhost
276	93	database	minghos93
316	108	database	minghos108
166	57	database	minghos57
196	67	host	localhost
235	80	database	minghos80
253	86	database	minghos86
277	94	database	minghos94
317	108	host	localhost
167	57	port	27017
197	67	database	minghos67
236	80	host	localhost
254	86	host	localhost
278	94	host	localhost
318	108	port	27017
168	57	host	localhost
198	67	port	27017
237	80	port	27017
255	86	port	27017
279	94	port	27017
169	58	database	minghos58
199	68	database	minghos68
238	81	database	minghos81
256	87	database	minghos87
280	96	port	27017
170	58	host	localhost
200	68	host	localhost
239	81	host	localhost
257	87	host	localhost
281	96	database	minghos96
171	58	port	27017
201	68	port	27017
240	81	port	27017
258	87	port	27017
282	96	host	localhost
172	59	database	minghos59
202	69	host	localhost
241	82	database	minghos82
259	88	database	minghos88
283	97	database	minghos97
173	59	host	localhost
203	69	database	minghos69
242	82	host	localhost
260	88	host	localhost
284	97	host	localhost
174	59	port	27017
204	69	port	27017
243	82	port	27017
261	88	port	27017
285	97	port	27017
175	60	database	minghos60
205	70	host	localhost
286	98	database	minghos98
176	60	port	27017
206	70	database	minghos70
287	98	host	localhost
177	60	host	localhost
207	70	port	27017
288	98	port	27017
178	61	host	localhost
208	71	database	minghos71
289	99	database	minghos99
179	61	database	minghos61
209	71	host	localhost
290	99	host	localhost
180	61	port	27017
210	71	port	27017
291	99	port	27017
181	62	database	minghos62
292	100	host	localhost
182	62	host	localhost
293	100	database	minghos100
183	62	port	27017
294	100	port	27017
295	101	host	localhost
296	101	port	27017
297	101	database	minghos101
298	102	database	minghos102
299	102	host	localhost
300	102	port	27017
301	103	port	27017
302	103	database	minghos103
303	103	host	localhost
304	104	database	minghos104
305	104	host	localhost
306	104	port	27017
155	53	host	localhost
\.


--
-- TOC entry 2987 (class 0 OID 16431)
-- Dependencies: 207
-- Data for Name: d_uconfig; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.d_uconfig (id, org, "user", password, lang) FROM stdin;
11	13	jhondoe	\N	es
12	14	jhondoe1	\N	es
13	15	jhondoe2	\N	es
14	16	jhondoe3	\N	es
15	17	jhondoe4	\N	es
16	18	jhondoe5	\N	es
17	19	jhondoe6	\N	es
18	20	jhondoe7	\N	es
19	21	jhondoe8	\N	es
20	22	jhondoe9	\N	es
21	23	jhondoe10	\N	es
22	24	jhondoe11	\N	es
23	25	jhondoe12	\N	es
24	26	jhondoe13	\N	es
25	27	jhondoe14	\N	es
26	28	jhondoe15	\N	es
27	29	jhondoe16	\N	es
28	30	jhondoe18	\N	es
29	31	jhondoe20	\N	es
30	32	jhondoe21	\N	es
31	33	jhondoe22	\N	es
32	34	jhondoe23	\N	es
33	35	jhondoe24	\N	es
34	36	jhondoe25	\N	es
35	37	jhondoe26	\N	es
36	38	jhondoe27	\N	es
37	39	jhondoe28	\N	es
38	40	jhondoe29	\N	es
39	41	jhondoe30	\N	es
40	42	jhondoe31	\N	es
41	43	jhondoe32	\N	es
42	44	jhondoe33	\N	es
43	45	jhondoe34	\N	es
44	46	jhondoe35	\N	es
45	47	jhondoe36	\N	es
46	48	jhondoe37	\N	es
47	49	jhondoe38	\N	es
48	50	jhondoe39	\N	es
49	51	jhondoe40	\N	es
50	52	jhondoe41	\N	es
51	53	jhondoe42	\N	es
52	54	jhondoe43	\N	es
53	55	jhondoe44	\N	es
54	56	jhondoe45	\N	es
55	57	jhondoe46	\N	es
56	58	jhondoe47	\N	es
57	59	jhondoe48	\N	es
58	60	jhondoe49	\N	es
59	61	jhondoe50	\N	es
60	62	jhondoe51	\N	es
61	63	jhondoe52	\N	es
62	64	jhondoe55	\N	es
63	65	jhondoe100	\N	es
64	66	jhondoe101	\N	es
65	67	jhondoe102	\N	es
66	68	jhondoe200	\N	es
67	69	jhondoe201	\N	es
68	70	jhondoe202	\N	es
69	71	jhondoe205	\N	es
70	72	jhondoe010	\N	es
71	73	jhondoe300	\N	es
72	74	jhondoe400	\N	es
73	75	jhondoe500	\N	es
74	76	jhondoe600	\N	es
75	77	jhondoe650	\N	es
76	78	jhondoe700	\N	es
77	79	jhondoe800	\N	es
78	80	jhondoe900	\N	es
79	1	jhondoe910	\N	es
80	81	jhondoe1000	\N	es
81	81	jhondoe1002	\N	es
82	82	jhondoe1100	\N	es
83	1	jhondoe1200	\N	es
84	1	jhondoe1201	\N	es
85	1	jhondoe1202	\N	es
86	1	jhondoe1203	\N	es
87	83	jhondoe1300	\N	es
88	81	jhondoe1003	\N	es
89	84	jhondoe1900	\N	es
90	85	jhondoe2000	\N	es
91	85	jhondoe2001	\N	es
92	85	jhondoe2005	\N	es
93	86	jhondoe2100	\N	es
94	86	jhondoe2101	\N	es
95	87	jhondoe2200	\N	es
96	87	jhondoe2201	\N	es
97	88	jhondoe2300	\N	es
98	88	jhondoe2301	\N	es
99	89	jhondoe1350	\N	es
100	90	jhondoe1450	\N	es
101	91	carlosromero	\N	es
102	92	jhondoe3500	\N	es
103	93	jhondoe10000	\N	es
104	94	jhondoe1800	\N	es
105	95	user110	\N	es
106	96	user111	\N	es
107	97	jhondoe112	\N	es
108	98	jhondoe113	\N	es
109	99	jhondoe114	\N	es
110	100	jhondoe115	\N	es
111	101	jhondoe116	\N	es
112	102	jhondoe117	\N	es
113	103	jhondoe118	\N	es
114	104	jhondoe119	\N	es
115	105	jhondoe120	\N	es
116	106	jhondoe121	\N	es
117	107	jhondoe123	\N	es
118	108	jhondoe122	\N	es
119	109	jhondoe124	\N	es
120	110	jhondoe2001	\N	es
121	111	jhondoe2002	\N	es
122	112	jhondoe009	\N	es
1	1	admin	2221	es
\.


--
-- TOC entry 2985 (class 0 OID 16423)
-- Dependencies: 205
-- Data for Name: s_system; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.s_system (id, active, nuser, maxuser, nit, org, email, version, token, fecharegistro) FROM stdin;
112	t	0	5	665465465	empresa nueva 009	jhondoe009@xsitecompany.net	0.0.1	f7308a8b527a6c1e39e10ababe16c969cf1e4ad7dcd966682c5aeeae483657b8	2021-05-31
110	t	0	5	2345234523	empresa patito abcd	jhondoe2001@xsitecompany.net	0.0.1	b6c35b44196ad7847d45069d4ce9386e77938814a172b779eecdbca0af43a3ff	2021-05-26
92	f	0	5	909595190	empresa nueva 3500	jhondoe3500@xsitecompany.net	0.0.1	7ca183bb2c175aa82b3f9ca67dee81bba7fdf40ebb2eba628f341799cfe17de6	2021-05-07
97	f	0	5	9001887256	Xsite Company 112	jhondoe112@xsitecompany.net	0.0.1	d1d4ff8d62d60ef1d7676431335e6d96e5b0351ef9e33b68c9102bc2d391a5d3	2021-05-08
102	t	0	5	900188730	Xsite Company 117	jhondoe117@xsitecompany.net	0.0.1	89bc7ad9bbc20a2118522a601c6ccd8a62ff03e71e9b777c95ba69b4d0a3741b	2021-05-08
107	f	0	5	900188735	Xsite Company 123	jhondoe123@xsiteocmpany.net	0.0.1	9463c51e990a37457f9514379f6d19ca2841c64f65a6694c8d3204197dc7d1c2	2021-05-08
83	t	0	5	6519849232	Empresa Nueva 1300	jhondoe1300@xsitecompany.net	0.0.1	19b872cb0cc6539d14e74d3c2b21d429bfdc95551306a40a979a52563f1f61cd	2021-05-02
77	f	0	5	65465465	nueva empresa 650	jhondoe650@xsitecompany.net	0.0.1	09dedc2d7343904e72548a3d1f870a5f124cf151f08275ab76cf1a14c2759a93	2021-05-01
72	t	0	5	165462321659	nueva empresa 010	jhondoe010@xsitecompany.net	0.0.1	b972a809862dd002a5a9bb1f6a03aab6dd091d171985c204e4356cc2d8cf78d5	2021-04-23
71	t	0	5	651651321	empresa nueva 205	jhondoe205@xsitecompany.net	0.0.1	b7aaf43057fa128bd312ecbb9c326c6557fb0435c4b2b1b1fdb994c3e874a388	2021-04-20
68	t	0	5	654613216	empresa nueva 200	jhondoe200@xsitecompany.net	0.0.1	8c8dcb21b4e884a958df5ce38abb36f228b62498db2c00daeff440df14cc9696	2021-04-20
38	f	0	5	9849546546	empresa nueva	jhondoe27@xsitecompany.net	0.0.1	c3f0d57e3834e76f6b389e2eff187b749887258528c8cd55a38a0b6bcbbbe5c4	2021-04-17
54	t	0	5	845698479658	nombre empresa	jhondoe43@xsitecompany.net	0.0.1	1a4482c132f27e2eca83378def63a8c8dd4fcd8f06fbf6265e845f865f667f4e	2021-04-18
57	t	0	5	938480983400	empresa abc	jhondoe46@xsitecompany.net	0.0.1	4171993263bac1f4285aebe3fa8153e5f3c84cb11668b3b69df6559baa7e4f35	2021-04-18
42	f	0	5	93847953	nueva empresa pajaro	jhondoe31@xsitecompany.net	0.0.1	4294ff26cc29181dc00d6edeaf8983305fa3ba3f8b37171a5332389cb7723071	2021-04-18
90	t	0	5	5616216498	empresa nueva 1450	jhondoe1450@xsitecompany.net	0.0.1	a60c7d8fe1123d5b17d75c15c4a8a15484f0b0cc5bce986b6b3df33615843838	2021-05-04
86	t	0	5	6162651623	empresa nueva 2100	jhondoe2100@xsitecompany.net	0.0.1	886cbf7407d43861bed5c496d12e4fce5ecb78195ef92d97dc9058f4ffc90e12	2021-05-02
31	t	0	5	6546513265	empresa nueva pajaro	alguien@xsitecompany.net	0.0.1	abef5378be54d842f894048e6e2aee74e7ff2b35cbbc116d06c10b1fa0aaf591	2021-04-14
19	t	0	5	65498423	nueva empresa abcdefg	jhondoe6@xsitecompany.net	0.0.1	14fe4c2b7d9f9b079263df3f076b7511cf73fa75416dbfa5f7e733e461507261	2021-04-08
48	t	0	5	9809820986	empresa nueva jhondoe	jhondoe37@xsitecompany.net	0.0.1	76874eb526fc74c03a7f3c8f9bcf4fa820e5aac9f76921813e4c60aeeed0f8ee	2021-04-18
89	f	0	5	984621654	empresa nueva 1350	jhondoe1350@xsitecompany.net	0.0.1	a179b6822e9f40de6141712eee70a276381da5aaf9d9243a62448dac466cb75c	2021-05-04
91	f	0	5	900188723	Xsite Information Technology Company	carlos@xsitecompany.net	0.0.1	d827a681930e7b15f874e708bbece47d004850c8f6fddc24211b08dacbc397af	2021-05-07
20	t	0	5	6543216546	nueva empresa abcdefgh	jhondoe7@xsitecompany.net	0.0.1	bb138b3c7be3b89ebac87ef79fded76f7b890400bbfb8714cc480f7eb7f9e0c0	2021-04-08
23	f	0	5	65465465462	empresa abcdefghij	jhondoe10@xsitecompany.net	0.0.1	94d1a381886bb5e349b967bd2fb96d408e545b79d731f18684b381b51cda8ccd	2021-04-09
63	t	0	5	9840593084	empresa pajaro abcde	jhondoe52@xsitecompany.net	0.0.1	00b69ce3f6b7e7ef734c0d47b45a94858be4b0dc5074ee7e8f1142a2d2551b3d	2021-04-19
88	t	0	5	9516215	empresa nueva 2300	jhondoe2300@xsitecompany.net	0.0.1	1a8cde4f676d3f1da2900ae5e8b026bb50814c1933adea0a189258feaa634613	2021-05-02
59	t	0	5	39847598349	empresa nueva 002	jhondoe48@xsitecompany.net	0.0.1	11c4e4dfb49b8f301b5cc43ad4e933bdf30252b8759512da5ca5398dff13878e	2021-04-18
18	t	0	5	9865465345	empresa patito abc	jhondoe5@xsitecompany.net	0.0.1	62cd9f6b4a69c2eb261a30cc40de4be84a333b990431a2e44414b9ef2d5885e6	2021-04-08
55	t	0	5	3945983495	empresa nueva otra	jhondoe44@xsitecompany.net	0.0.1	ff3b1eb85bf450ab1210756984432088ee0655ba17bf24a6217492fc77abd231	2021-04-18
61	t	0	5	93245098203	empresa nueva cdef	jhondoe50@xsitecompany.net	0.0.1	57b5a73e51dc4611819658e1b4bb582f04bd86c9194ec9414f83724fd756ad00	2021-04-18
95	f	0	5	900188724	Xsite Company 110	jhondoe110@xsitecompany.net	0.0.1	ba59f69f55e2368a75e360f6ad7c21a14050105a5c771d53cbf69262cbf82d80	2021-05-08
43	f	0	5	3984793945	nueva empresa pajaro1	jhondoe32@xsitecompany.net	0.0.1	f6f9e98ea4dc5fadd2e47258a6f55af32413d128a77bcaac79acde4a92c04c40	2021-04-18
49	t	0	5	948697438659	empresa otra abcdefg	jhondoe38@xsitecompany.net	0.0.1	f92b874c485db8eb80b8f797b3af14b6d415b7d973718973d62aeab26864dc8c	2021-04-18
52	t	0	5	34809820345	empresa nueva abcdefghijklm	jhondoe41@xsitecompany.net	0.0.1	0c0d9738e94f67b8c890443e78c2b312f52ef4acabea41603b0ee81695817bbc	2021-04-18
58	t	0	5	28430928304	empresa nueva cde	jhondoe47@xsitecompany.net	0.0.1	11bd3543196f15d048fd8e380bb947b53b40aae826514a16f5f90f2062a3011a	2021-04-18
21	t	0	5	654654646	empresa patito abcdefg	jhondoe8@xsitecompany.net	0.0.1	da217a1982b813a1c5c361fd1776b3c7ff4a9744d09fafa2de4c90efb754a4e4	2021-04-09
22	t	0	5	98495465	nueva empresa abcdefghi	jhondoe9@xsitecompany.net	0.0.1	46d1cfae819c2d7c3b4ac93f5212c728506f07a3273b3e7fd9d29e7aab937956	2021-04-09
64	t	0	5	46546521654	empresa nueva 055	jhondoe55@xsitecompany.net	0.0.1	3df645a2cb5dfd5f817df35796237830fffce9a0a6d954fce6d93397562a06fd	2021-04-20
15	t	0	5	65459456546	empresa nueva abcde	jhondoe2@xsitecompany.net	0.0.1	f516940e9cedae3952c7bc467831e1432c9b27436a475873e3bf3fb025bd7f5c	2021-04-08
45	f	0	5	6546546456	empresa abd	jhondoe34@xsitecompany.net	0.0.1	090936879e70db90acb787561e277be6423b8c4f0203131e396a22ca70ccb731	2021-04-18
62	t	0	5	28309029340	empresa nueva cdefg	jhondoe51@xsitecompany.net	0.0.1	944729ebc4652006f6694e56ca894e892f7cf6e35f38cc94e4dbb919fc28c64f	2021-04-18
67	f	0	5	9864862354	empresa nueva 102	jhondoe102@xsitecompany.net	0.0.1	5202670d79c04f7b550224482400cce20d19189baf5d52316076fdea29a737be	2021-04-20
76	t	0	5	98465165466	empresa nueva 600	jhondoe600@xsitecompany.net	0.0.1	fa6236c0f7248ecd2e4c5cdd695af2369bf03b7f312dce3aa86e582cbda1d509	2021-04-29
34	f	0	5	98466546546321	empresa pajarito abcde	jhondoe23@xsitecompany.net	0.0.1	21ec2352959287ed4b84562d3b7f0df40491be7ec817c33ba54f29d0338ac7d1	2021-04-17
16	t	0	5	546546546	nueva empresa abcde	jhondoe3@xsitecompany.net	0.0.1	8ede6b7e8a4e8505d5812f6b06ec16c441b284416b0b07bc4477b751d6af79d6	2021-04-08
73	t	0	5	6546546546	empresa nueva 300	jhondoe300@xsitecompany.net	0.0.1	ed851ae12462eac243a157037c429a4ef052041d60a37b04ed6f42064400b0ac	2021-04-24
24	t	0	5	651626516234	empresa patito abcdefhij	jhondoe11@xsitecompany.net	0.0.1	28bdb30cae3b19ec9f24f018bf1044e2c607703ecf36849f1159533f5a72d07c	2021-04-09
75	t	0	5	46546546	empresa nueva 500	jhondoe500@xsitecompany.net	0.0.1	8315abb3c286524df7cfbcc71270cc42ef4396122cca2b98ffb8e40349042877	2021-04-29
65	t	0	5	9849549	empresa nueva 100	jhondoe100@xsitecompany.net	0.0.1	c3c84ca047c9a31b2dc789ec35e48c4b4e703cabb718cb80f18b8c2de2241998	2021-04-20
37	f	0	5	94985346455	empresa pato de hule	jhondoe26@xsitecompany.net	0.0.1	4740020040aa4449bb6be4f6fa0e78f12264f9f2a3fb1072b41622650a3c5181	2021-04-17
51	t	0	5	938479583405	empresa nueva hp	jhondoe40@xsitecompany.net	0.0.1	6f11db4d923dd9abc2176b01c6f8307f8d3516194a9decfd9ef49154035d2bf3	2021-04-18
14	t	0	5	9846549459	nueva empresa abcd	jhondoe1@xsitecompany.net	0.0.1	fe07c2437f02bffdecffd26a5cfd341c31117ed910ea1281783498d06b674f86	2021-04-08
93	f	0	5	9010651062	Xsite Information Technology Company 1000	jhondoe10000@xsitecompany.net	0.0.1	12c527ab6e1afe5eac2f80f21f0e87b6ced704b47ef25c8756f96c8eaa7d687e	2021-05-07
98	t	0	5	900188726	Xsite Company 113	jhondoe113@xsitecompany.net	0.0.1	fa16302fa850112d56d323cf215fda3488063f799eec66753decac893031cac5	2021-05-08
103	t	0	5	900188731	Xsite Company 118	jhondoe118@xsitecompany.net	0.0.1	fd9569f6603b58fcae4b8de9c53b9c49a0c8510eae84b081c8f648bd4f0ab372	2021-05-08
108	f	0	5	900188736	Xsite Company 122	jhondoe122@xsitecompany.net	0.0.1	ebc022b3e363179ff55cfabbcd5b30bccf13dcf3c034e1894bfacdbe3d7139c3	2021-05-08
39	f	0	5	34251321334	empresa nueva bdc	jhondoe28@xsitecompany.net	0.0.1	eda0d1985981f831b69fa8af6abf8879b2885e38f01c09b267e84a8f98e37591	2021-04-18
26	t	0	5	949987423065	nueva empresa abcdefghij	jhondoe13@xsitecompany.net	0.0.1	ff23e6d47601ec7eb35fca25ba1efc793fd279b0d116a5836a290523d1011bc4	2021-04-10
28	t	0	5	984951621951	empresa nueva pato de hule abc	jhondoe15@xsitecompany.net	0.0.1	845f87edaf89518e3c33a2982dcaf85c3681040c4c2e158424856dddee2467db	2021-04-10
29	t	0	5	6849613165	empresa nueva p	jhondoe16@xsitecompany.net	0.0.1	71a0893e569f1b63817c8ad2ef8feca2f23964bb9e631693d847250b176b2c58	2021-04-10
80	t	0	5	9879879879	nueva empresa 900	jhondoe900@xsitecompany.net	0.0.1	4100b8fd4e4c63f14caa7609967b4f2f56d618fa60b4d275014a2eb41f5a9f1f	2021-05-01
46	f	0	5	3498853450	empresa nueva jhon	jhondoe35@xsitecompany.net	0.0.1	6d7dec21820b461a4e28b9ed9662ebdc8bb940abb0008526d4bccfc97ff2919d	2021-04-18
32	f	0	5	98466546546	empresa pajarito abc	jhondoe21@xsitecompany.net	0.0.1	fc079bb472a6c14ef180e9382b46c51741e08fe4c5938b6e14f67060fcd3866a	2021-04-17
35	f	0	5	984665465463211	empresa pajarito abcdef	jhondoe24@xsitecompany.net	0.0.1	771998a098706edb501f232c5cb5ccf863fe1219fae1255fcdf471bab7d4a723	2021-04-17
13	t	0	5	9845465498	nueva empresa abc	jhondoe@xsitecompany.net	0.0.1	4695cfeb65a00a758a48b155f89a19f788c80b26d56339629789dcf89a6e1ad7	2021-04-08
81	t	0	5	954961616	empresa nueva 1000	jhondoe1000@xsitecompany.net	0.0.1	3ff576cddb5085f9f7d2d8510719f151d7ab97b621852a6adc737a15c25d656b	2021-05-01
96	t	0	5	900188725	Xsite Company 111	jhondoe111@xsitecompany.net	0.0.1	9b58f56252dcef7c870859b4542b1d25ad0ba1478d72e5c15976b87429edee64	2021-05-08
101	t	0	5	900188729	Xsite Company 116	jhondoe116@xsitecompany.net	0.0.1	1d9469c3bc21027f6b79ac5af283fa9cd47bc625752863f13444a40abe0e69a4	2021-05-08
106	f	0	5	900188734	Xsite Company 121	jhondoe121@xsitecompany.net	0.0.1	f7550f801897b0e0517d04463a18e50297d7063c66205503db1d86454e1101c1	2021-05-08
79	t	0	5	9849516165	empresa nueva 800	jhondoe800@xsitecompany.net	0.0.1	fa13bba3b6cd720ba0db3e74f4e20357cd160e869430c2e7ba379fb87cd3b0ab	2021-05-01
87	t	0	5	984951651	empresa nueva 2200	jhondoe2200@xsitecompany.net	0.0.1	a6efded93dd668fb2f85d4c2bd3a31e48acf06a83f834de813a50868693a0cd6	2021-05-02
25	t	0	5	9516216519	empresa nueva abcdefghi	jhondoe12@xsitecompany.net	0.0.1	0a9d8b4c39c753c12df8e7006e913de76c4d6c820e4d30f0ecb293672999e66f	2021-04-10
109	t	0	5	900188737	Xsite Company 124	jhondoe124@xsitecompany.net	0.0.1	bd1d9734a5ede7c994ea6ad15c75348b9415012a65b026ae5baf93f1e4cd1126	2021-05-09
69	t	0	5	984665464	empresa nueva 201	jhondoe201@xsitecompany.net	0.0.1	f80260ee3d1f9aacf2373148ac44e4c61fe9437c64765dbf08ac76f31c8bbe79	2021-04-20
74	t	0	5	65465432165	empresa nueva 400	jhondoe400@xsitecompany.net	0.0.1	d83d362604fb1d2a014198139067559b55a85aa1831175f309d5c234b3223efe	2021-04-25
94	t	0	5	9006561316516	Xsite Information Technology Company 1800	jhondoe1800@xsitecompany.net	0.0.1	e5308b5e9071a4ce59bcb56afbdfd1c76e86cafeb1a81a4511e02d8c7710fe17	2021-05-07
99	t	0	5	900188727	Xsite Company 114	jhondoe114@xsitecompany.net	0.0.1	3609e47df706a4878675ca03d5a1550d126a0eef8ac83f2c47b0fa73b8bc4176	2021-05-08
104	f	0	5	900188732	Xsite Company 119	jhondoe119@xsitecompany.net	0.0.1	05e3a9c0f9934df7339d8417b15340ddafc9285a67a795a687a6c709872f1b0a	2021-05-08
60	t	0	5	3240980254	empresa nueva 003	jhondoe49@xsitecompany.net	0.0.1	d5c2c85c7365513d558e1f031ba33d57fb02c8833a3f01fdabec9a67414c02ba	2021-04-18
36	f	0	5	6549842465463	empresa nueva pajaro picon	jhondoe25@xsitecompany.net	0.0.1	01b9d4d4bd5a81774a1887e8e58b7a3be190f17350f5efbe5ef9e65dad85a3a5	2021-04-17
56	t	0	5	9384953050	empresa nueva 001	jhondoe45@xsitecompany.net	0.0.1	0833b911d3d8b3a6d07b552ced6d2897f85ad67cae9d42d6b015096364ad7bc9	2021-04-18
1	t	1	5	900188723	Xsite Company	soporte@xsitecompany.net	0.0.1	777	2021-01-09
30	t	0	5	6546456546	empresa nueva par apruebas	jhondoe18@xsitecompany.net	0.0.1	7737e01998af5c26a6462ddbde96b392aeb3395c14d960d6b7036c43b91ee5a7	2021-04-11
85	t	0	5	99622611	Empresa nueva 2000	jhondoe2000@xsitecompany.net	0.0.1	f2fb88e17bf7d9d73cac4b74e3f7fcd6d95be99114903c57f929043192ab671a	2021-05-02
111	t	0	5	234523452312	empresa patito abcde	jhondoe2002@xsitecompany.net	0.0.1	3b74204f5b51cd2b74e5eb4605decdab9d1c56b256de422df001dbfe4a1b2bc0	2021-05-26
33	f	0	5	9846654654632	empresa pajarito abcd	jhondoe22@xsitecompany.net	0.0.1	66c2bd54ca810c71104a91dfc380f11d0067ea3b27302006103e88236df517a3	2021-04-17
100	t	0	5	900188728	Xsite Company 115	jhondoe115@xsitecompany.net	0.0.1	25e149916fa045f0a7189bb8c65c0b963dedd8c3d1b428cf8066e0e4168912fb	2021-05-08
105	f	0	5	900188733	Xsite Company 120	jhondoe120@xsitecompany.net	0.0.1	a96aabf498c93f27cc15ef4f7d32548ceba5f24d65e6249e1999fddbad63192d	2021-05-08
40	f	0	5	30498405	empresa otra	jhondoe29@xsitecompany.net	0.0.1	20211981c2e997ecdd72d6a67c3d30e3288c29d842f5996749a995f9d2326b11	2021-04-18
66	t	0	5	54986216513	empresa nueva 101	jhondoe101@xsitecompany.net	0.0.1	ffc84379abc1435286ad29037623bdd428414c3038f1ab14ab8b5f6921f2ce0e	2021-04-20
70	t	0	5	6564661161	empresa nueva 202	jhondoe202@xsitecompany.net	0.0.1	9ce6173fcf0aef0e8706ba5dba10336c9504c3df58366f0dd2b417d9e3f23fd9	2021-04-20
82	t	0	5	5165132165	empresa nueva 1100	jhondoe1100@xsitecompany.net	0.0.1	7eb1fc7ef509fa2c9aa928fe3ede7fd36ac3729d259641703cdee7cfe53fe31d	2021-05-01
84	f	0	5	5646122131987	Empresa nueva 1900	jhondoe1900@xsitecompany.net	0.0.1	7cd47ebea27f6ada0857f74dcf9d9af74a341960614acb20054894011148d622	2021-05-02
78	t	0	5	65462161626	nueva empresa 700	jhondoe700@xsitecompany.net	0.0.1	75a4ba1a234ce22b5d04eac0d695806944c01eea20a0fced0fc3fe4c972109c4	2021-05-01
27	t	0	5	32165621654	empresa nueva abcdefghij	jhondoe14@xsitecompany.net	0.0.1	4e7b69f847498bff346b859b5e4f114afc10b71f9747b2021ff6ff1123a225d7	2021-04-10
17	t	0	5	21451421684	nueva empresa abcdef	jhondoe4@xsitecompany.net	0.0.1	180925e41b553d763c63b6b471377cb055e93c25e436970ce6b6812433e22324	2021-04-08
41	f	0	5	29479823794	nueva empresa nueva	jhondoe30@xsitecompany.net	0.0.1	3ec350ea8c4d68e6d85cf1ceea1fd85ffca795ed23a397d335a4665227a1c371	2021-04-18
44	f	0	5	8359834958	nueva empresa epm	jhondoe33@xsitecompany.net	0.0.1	f8f2038ddf1c9737d883300a8200904276552e737b3b6200329333f3e9a1819a	2021-04-18
47	t	0	5	880938045	empresa pajaro abcd	jhondoe36@xsitecompany.net	0.0.1	6c685797c50b31e5aac6bc3e3face7217c2a8b1d055b7efd323d1ec75bb84ffb	2021-04-18
50	t	0	5	9834098503940	empresa nueva abcdefghijkl	jhondoe39@xsitecompany.net	0.0.1	bdd7df74271a6f7bfa07f7b4a6efdeadb6d0d440261b738e489a632429d1c328	2021-04-18
53	t	0	5	948560980403	empresa nueva bcd	jhondoe42@xsitecompany.net	0.0.1	1d428252b6d953662225d3c95d2985d71255ad28f086982a04a010deff031295	2021-04-18
\.


--
-- TOC entry 3000 (class 0 OID 0)
-- Dependencies: 202
-- Name: d_param_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.d_param_id_seq', 330, true);


--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 206
-- Name: d_uconfig_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.d_uconfig_id_seq', 122, true);


--
-- TOC entry 3002 (class 0 OID 0)
-- Dependencies: 204
-- Name: s_system_org_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.s_system_org_seq', 112, true);


--
-- TOC entry 2849 (class 2606 OID 16417)
-- Name: d_param d_param_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.d_param
    ADD CONSTRAINT d_param_pkey PRIMARY KEY (id);


--
-- TOC entry 2853 (class 2606 OID 16436)
-- Name: d_uconfig d_uconfig_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.d_uconfig
    ADD CONSTRAINT d_uconfig_pkey PRIMARY KEY (id);


--
-- TOC entry 2851 (class 2606 OID 16428)
-- Name: s_system s_system_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.s_system
    ADD CONSTRAINT s_system_pkey PRIMARY KEY (id);


--
-- TOC entry 2855 (class 2606 OID 16452)
-- Name: d_uconfig d_uconfig_s_system; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.d_uconfig
    ADD CONSTRAINT d_uconfig_s_system FOREIGN KEY (org) REFERENCES public.s_system(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2854 (class 2606 OID 16442)
-- Name: d_param s_system_d_param; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.d_param
    ADD CONSTRAINT s_system_d_param FOREIGN KEY (org) REFERENCES public.s_system(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE d_param; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.d_param TO administrator;
GRANT SELECT ON TABLE public.d_param TO jhondoe701;


--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 207
-- Name: TABLE d_uconfig; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.d_uconfig TO administrator;
GRANT SELECT ON TABLE public.d_uconfig TO jhondoe701;


--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 205
-- Name: TABLE s_system; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.s_system TO administrator;
GRANT SELECT ON TABLE public.s_system TO jhondoe701;


-- Completed on 2021-06-15 17:53:21 -05

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

-- Started on 2021-06-15 17:53:21 -05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2021-06-15 17:53:21 -05

--
-- PostgreSQL database dump complete
--

-- Completed on 2021-06-15 17:53:21 -05

--
-- PostgreSQL database cluster dump complete
--

