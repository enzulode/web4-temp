package com.enzulode.check;

import com.enzulode.dto.PointDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DefaultPointHitCheckerImpl implements PointHitChecker {

    @Override
    public boolean check(PointDto point) {
        return checkWithRadius(point, point.r());
    }

    @Override
    public boolean checkWithRadius(PointDto point, Integer radius) {
        // 2 quadrant: semicircle
        if (Integer.compare(point.x(), 0) <= 0 && Double.compare(point.y(), 0) >= 0) {
            double leftSide = Math.pow(point.x(), 2D) + Math.pow(point.y(), 2D);
            double rightSize = Math.pow(radius, 2D);
            return Double.compare(leftSide, rightSize) <= 0;
        }

        // 3 quadrant: triangle
        if (Integer.compare(point.x(), 0) <= 0 && Double.compare(point.y(), 0) <= 0) {
            double leftSide = point.y();
            double rightSide = -2D * point.x().doubleValue() - radius.doubleValue();
            return Double.compare(leftSide, rightSide) >= 0;
        }

        // 4 quadrant: rectangle
        if (Integer.compare(point.x(), 0) >= 0 && Double.compare(point.y(), 0) <= 0) {
            return Integer.compare(point.x(), radius) <= 0 && Double.compare(point.y(), -radius) >= 0;
        }

        // 1 quadrant: skip
        return false;
    }
}
