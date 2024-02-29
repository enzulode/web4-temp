CREATE TABLE IF NOT EXISTS attempts
(
    attempt_id UUID NOT NULL default uuid_generate_v4(), -- unique attempt identifier
    x_coord INTEGER NOT NULL, -- point x coordinate
    y_coord DOUBLE PRECISION, -- point y coordinate
    radius INTEGER NOT NULL, -- radius,
    is_hit BOOLEAN NOT NULL, -- is the point in the desired area

    created_by VARCHAR NOT NULL, -- attempt created by
    created_at TIMESTAMP NOT NULL, -- attempt created at

    CONSTRAINT points_pk PRIMARY KEY (attempt_id)
);

CREATE INDEX IF NOT EXISTS idx_points_u1 ON attempts (created_by);
