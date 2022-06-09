--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid text NOT NULL,
    sess json NOT NULL,
    expire timestamp without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uid integer NOT NULL,
    name character varying(30),
    email character varying(40),
    password text,
    secret text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_uid_seq OWNER TO postgres;

--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_uid_seq OWNED BY public.users.uid;


--
-- Name: users uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN uid SET DEFAULT nextval('public.users_uid_seq'::regclass);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire) FROM stdin;
Pv_vjdnBORuuQfQUqPDHGud2tCWmgr-n	{"cookie":{"originalMaxAge":7200000,"expires":"2022-06-09T08:31:34.598Z","secure":false,"httpOnly":false,"path":"/","sameSite":false},"userId":3}	2022-06-09 10:48:16
kttXPB7QcQlHGSWawTFUI-JFUHe6t3OU	{"cookie":{"originalMaxAge":7200000,"expires":"2022-06-09T08:53:21.979Z","secure":false,"httpOnly":false,"path":"/","sameSite":false},"userId":6}	2022-06-09 10:53:23
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uid, name, email, password, secret) FROM stdin;
2	John	john@gmail.com	$2b$10$ibhvoYeSmNrzMXjHsTgKGOhbttoKHRcxL8yOZriyA1wl3GzBPzHcK	Likes Justin Biber
3	Kristof	kristof@gmail.com	$2b$10$uiu2xrDSIZGNTtOPfey9/.Xa2N6E5JhJ.LZbjWWMErS2Du752FFva	Likes Ju
4	Kristof	matura.k04@htlwienwest.at	$2b$10$ACNGjUjIMigdGNpdJtCy9.DNNPgZIO3HVgcQAhjjO3iQKl.NDinze	Likes SEW
5	Max 	max@schuller.at	$2b$10$JIt2s4Os.g.Ks2sC3jN0KeSFZAZsNsoodUqElfd70t2zSYDunTdBC	Likes Fortnite
\.


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_uid_seq', 6, true);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- Name: idx_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_session_expire ON public.session USING btree (expire);


--
-- PostgreSQL database dump complete
--

