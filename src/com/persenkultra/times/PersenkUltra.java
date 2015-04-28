package com.persenkultra.times;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

public class PersenkUltra extends ResourceConfig {
	public PersenkUltra() {
		register(RolesAllowedDynamicFeature.class);
	}
}