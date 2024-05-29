$ttl 86400
@       IN      SOA ns.secondary.com. hostmaster.secondary.com. (
                    202 ; Serial
                    600 ; Refresh
                    3600; Retry
                    12378237) ; Expire

@       IN      NS ns.secondary.com.
ns      IN      A 127.0.0.1