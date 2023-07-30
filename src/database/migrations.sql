-- public.user_ definition

-- Drop table

-- DROP TABLE public.user_;

CREATE TABLE public.user_ (
	id_ uuid NOT NULL DEFAULT uuid_generate_v4(),
	username_ text NULL,
	password_ text NULL,
	email_ text NULL,
	first_name_ text NULL,
	last_name_ text NULL,
	is_registered_ bool NOT NULL DEFAULT false,
	created_on_ timestamptz NOT NULL DEFAULT now(),
	last_logged_in_on_ timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT users_pkey PRIMARY KEY (id_)
);