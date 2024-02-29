package com.enzulode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
        security
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(hr -> hr.anyRequest().authenticated());

        security
            .oauth2ResourceServer(rs -> rs.jwt(Customizer.withDefaults()));

        security
            .sessionManagement(sm -> sm.sessionCreationPolicy(STATELESS));

        return security.build();
    }

}
