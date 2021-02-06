--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

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
-- Data for Name: channel; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.channel (created, title, updated) VALUES ('2020-12-05T18:15:26.505Z', 'Nutrition', '2020-12-05T18:15:26.505Z');
INSERT INTO public.channel (created, title, updated) VALUES ('2020-12-05T18:15:38.887Z', 'Fertility', '2020-12-05T18:15:38.887Z');
--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.users (about_us, city, country, created, email, enabled, first_name, is_mobile_validated, last_name, mobile_number, password, local_date, registration_id, role, salutation, speciality, state, updated, dtype) VALUES ('Docspace email', 'Bamboo Flat', 'India', '2020-12-12T18:34:48.477Z', 'brahim.pro@protonmail.com', true, 'Brahim', false, 'Sahbi', '911111111111', '{bcrypt}$2a$10$RI8obAB6TL0dcNbbJUeJzuCl57d3UDbFyLDQvId1twvzmwLH7H2wm', '2020-12-12', '2f4c51ae-28c0-4a5c-aff9-0c5ae435f6e0', 'USER', 'Dr.', 'Physician - IVF specialist', NULL, '2020-12-12T18:34:48.477Z', 'User');
INSERT INTO public.users (about_us, city, country, created, email, enabled, first_name, is_mobile_validated, last_name, mobile_number, password, local_date, registration_id, role, salutation, speciality, state, updated, dtype, biography, credential, image) VALUES ('Docspace email', 'Bamboo Flat', 'India', '2020-12-12T18:34:48.477Z', 'b@b.b', true, 'Brahim', false, 'Sahbi', '911111111111', '{bcrypt}$2a$10$RI8obAB6TL0dcNbbJUeJzuCl57d3UDbFyLDQvId1twvzmwLH7H2wm', '2020-12-12', '2f4c51ae-28c0-4a5c-aff9-0c5ae435f6e0', 'USER', 'Dr.', 'Physician - IVF specialist', NULL, '2020-12-12T18:34:48.477Z', 'Speaker', 'Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala ( regular 14, charater limit 160 character max)', 'credential', 'image_url');


--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (3, '2020-12-05T18:17:33.597Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 1, '2021-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_1.jpg', 'Nutrition course', '2020-12-05T18:17:33.597Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (4, '2020-12-05T18:18:51.797Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 2, '2021-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_2.jpg', 'Nutrition course', '2020-12-05T18:18:51.797Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (5, '2020-12-05T18:19:04.781Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 3, '2021-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_1.jpg', 'Nutrition course', '2020-12-05T18:19:04.781Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (6, '2020-12-05T18:19:13.061Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 4, '2021-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_2.jpg', 'Nutrition course', '2020-12-05T18:19:13.061Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (7, '2020-12-05T18:19:22.152Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 5, '2021-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_3.jpg', 'Nutrition course', '2020-12-05T18:19:22.152Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (8, '2020-12-05T18:19:29.961Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 6, '2021-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_4.jpg', 'Nutrition course', '2020-12-05T18:19:29.961Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (9, '2020-12-05T18:19:38.188Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 7, '2021-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_5.jpg', 'Nutrition course', '2020-12-05T18:19:38.188Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (10, '2020-12-05T18:19:46.707Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 8, '2022-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_6.jpg', 'Nutrition course', '2020-12-05T18:19:46.707Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (11, '2020-12-05T18:19:56.975Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 9, '2022-12-05T18:17:33.597Z', 'Published', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_7.jpg', 'Nutrition course', '2020-12-05T18:19:56.975Z', NULL, 'http://docspace-videos.s3.us-east-2.amazonaws.com/nutrition+course.mp4', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (12, '2020-12-05T18:19:56.975Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 9, '2022-12-05T18:17:33.597Z', 'Live', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_7.jpg', 'Nutrition course', '2020-12-05T18:19:56.975Z', NULL, 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (13, '2020-12-05T18:19:56.975Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 9, '2022-12-05T18:17:33.597Z', 'Upcoming', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_7.jpg', 'Nutrition course', '2020-12-05T18:19:56.975Z', NULL, 'https://www.youtube.com/embed/Btv7G0BV45g', 2);
INSERT INTO public.video (id, created, description, episode, event_date, status, thumbnail, topic, updated, upload_date, url, speaker_id) VALUES (14, '2020-12-05T18:19:56.975Z', 'Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate Profile: Senior Consultant & Associate Professor Dept : Reproductive Medicine and Surgery AIMS - AMRITA Institute Of Medical Sciences, Kochi, Kerala Profile: Senior Consultant & Associate (Character Limit 375 max , reg 14 )', 9, '2022-12-05T18:17:33.597Z', 'Live', 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_7.jpg', 'Nutrition course', '2020-12-05T18:19:56.975Z', NULL, 'https://secondary.wstream.net/abr_live/ngrp:docspace_all/playlist.m3u8', 2);


--
-- Data for Name: video_channel; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.video_channel (channel_id, video_id) VALUES (1, 3);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (1, 4);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 5);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 6);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 7);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 8);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 9);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 10);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 11);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 12);
INSERT INTO public.video_channel (channel_id, video_id) VALUES (2, 13);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

