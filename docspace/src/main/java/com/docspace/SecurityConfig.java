package com.docspace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    DataSource datasource;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImp();
    }
    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(datasource)
                .passwordEncoder(passwordEncoder())
                .usersByUsernameQuery(
                        "select email, password, enabled from users where email=?")
                .authoritiesByUsernameQuery(
                        "select email, role from users where email=?");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/login*")
                .permitAll()
                .antMatchers("/")
                .permitAll()
                .antMatchers("/api/user/register")
                .permitAll()
                .antMatchers("/api/user/forgotpassword")
                .permitAll()
                .antMatchers("/api/geo/**")
                .permitAll()
                .antMatchers("/api/channel/*")
                .permitAll()
                .antMatchers("/api/video/**")
                .permitAll()
                .antMatchers("/api/speaker/*")
                .permitAll()
                .antMatchers("/api/user/confirmation/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .usernameParameter("email")
                .loginProcessingUrl("/api/user/login")
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                        if (e != null) {
                            httpServletResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            httpServletResponse.getWriter().print("Authentication failed !");
                        }
                    }
                })
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {

                        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
                        httpServletResponse.getWriter().print("Authentication successful !");
                    }
                })
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new AuthenticationEntryPoint() {
                    @Override
                    public void commence(HttpServletRequest request,
                                         HttpServletResponse response,
                                         AuthenticationException e)
                            throws IOException, ServletException {

                        if (e != null) {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.getWriter().print("Unauthorized !");
                        }
                    }
                })
                .and().logout().logoutUrl("/api/user/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        return encoder;
    }
}
