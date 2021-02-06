package com.docspace;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.docspace.persistence.model.User;
import com.docspace.persistence.repo.UserRepository;

class UserDetailsServiceImp implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("User not registered");
		}
		if (!user.isEnabled()) {
			throw new UsernameNotFoundException("User did not confirm registration within two weeks");
		}
		return new UserDetails() {
			private static final long serialVersionUID = 3914088278540544074L;

			@Override
			public boolean isEnabled() {
				return user.isEnabled();
			}
			
			@Override
			public boolean isCredentialsNonExpired() {
				return true;
			}
			
			@Override
			public boolean isAccountNonLocked() {
				return true;
			}
			
			@Override
			public boolean isAccountNonExpired() {
				return false;
			}
			
			@Override
			public String getUsername() {
				return user.getEmail();
			}
			
			@Override
			public String getPassword() {
				return user.getPassword();
			}
			
			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
				authorities.add(new GrantedAuthority() {

					private static final long serialVersionUID = -8220971574715437160L;

					@Override
					public String getAuthority() {
						return "USER";
					}
				});
				return authorities;
			}
		};
	}

}
