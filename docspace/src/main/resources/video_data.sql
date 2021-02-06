INSERT INTO channel(id, title) VALUES
(1, 'First Channel'),
(2, 'Second Channel')
ON CONFLICT(id) DO NOTHING;

INSERT INTO video(id, thumbnail) VALUES
(1, 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_1.jpg'),
(2, 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_2.jpg'),
(3, 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_3.jpg'),
(4, 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_4.jpg'),
(5, 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_5.jpg'),
(6, 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_6.jpg'),
(7, 'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_7.jpg')
ON CONFLICT(id) DO NOTHING;

INSERT INTO video_channel(channel_id,video_id) VALUES
(1,1), (1,2), (2,3),(2,4),(2,5),(2,6),(2,7);

INSERT INTO speaker(id, name,credential,biography) VALUES
(1,'Dr. Rahul Trivedi','MBBS,MD', 'Biography of the speaker'), (2,'Dr. Dinesh Trivedi','MBBS,MD', 'Biography of the speaker')
ON CONFLICT(id) DO NOTHING;

INSERT INTO event(id, thumbnail,topic,speaker_id) VALUES
(1,'https://docspace-thumbnail.s3.us-east-2.amazonaws.com/Thumbnail_1.jpg','Topic ', 1)
ON CONFLICT(id) DO NOTHING;